import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entity/customer.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { R2UploadService } from 'src/r2-upload/service/r2-upload.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly r2UploadService: R2UploadService,
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
}
