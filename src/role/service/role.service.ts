// src/roles/service/roles.service.ts
import { 
  BadRequestException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entity/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';


@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    // private permissionsService: PermissionsService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Check if role with this name already exists
    const existingRole = await this.roleRepository.findOne({
      where: { name: createRoleDto.name }
    });

    if (existingRole) {
      throw new BadRequestException(`Role with name ${createRoleDto.name} already exists`);
    }

    const { ...roleData } = createRoleDto;
    
    const role = this.roleRepository.create(roleData);
    

    
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ 
      relations: ['permissions'],
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
    
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { name },
      relations: ['permissions'],
    });
    
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }
    
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { ...roleData } = updateRoleDto;
    
    // If updating name, check that it doesn't conflict with existing role
    if (roleData.name) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: roleData.name }
      });

      if (existingRole && existingRole.id !== id) {
        throw new BadRequestException(`Role with name ${roleData.name} already exists`);
      }
    }
    
    // Load existing role
    const role = await this.roleRepository.preload({
      id,
      ...roleData,
    });
    
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    
    
    return this.roleRepository.save(role);
  }

  async remove(id: number): Promise<string> {
    // Check if any admin is using this role
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['admins'],
    });
    
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    
    if (role.admins && role.admins.length > 0) {
      throw new BadRequestException(
        `Cannot delete role as it is assigned to ${role.admins.length} admin(s). ` +
        `Change their roles first.`
      );
    }
    
    const result = await this.roleRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    
    return `Role with ID ${id} has been deleted`;
  }
}