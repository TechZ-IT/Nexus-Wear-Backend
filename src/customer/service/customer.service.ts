import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entity/customer.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from 'src/auth/service/auth.service';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly r2UploadService: R2UploadService,
    private readonly authService: AuthService,
  ) {}

  async create(
    createCustomerDto: CreateCustomerDto,
    imageFile: Express.Multer.File,
  ) {
    const { image, ...customerData } = createCustomerDto;
    const existingCustomer = await this.customerRepository.findOne({
      where: { email: createCustomerDto.email },
    });
    console.log(existingCustomer);

    if (existingCustomer) {
      throw new ForbiddenException('Customer with this email already exists');
    }

    // Hash the password before saving
    customerData.password = await bcrypt.hash(customerData.password, 10);

    const customer = this.customerRepository.create(customerData);
    const savedCustomer = await this.customerRepository.save(customer);

    if (imageFile) {
      const imageUploadResult = await this.r2UploadService.uploadAdminImage(
        imageFile,
        savedCustomer.id, // now id exists
      );
      if (!imageUploadResult) {
        throw new Error('Failed to upload image');
      }
      savedCustomer.image = imageUploadResult;
      return this.customerRepository.save(savedCustomer); // update with image
    }

    return savedCustomer;
  }

  async login(loginDto: LoginDto) {
    const customer = await this.customerRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!customer) {
      throw new NotFoundException('Customer with this email not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      customer.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password');
    }

    const token = this.authService.generateToken({
      id: customer.id,
      email: customer.email,
      role: 'customer',
    });

    return {
      data: customer,
      accessToken: token,
      message: 'Login Successful',
      status: 'success',
    };
  }
}
