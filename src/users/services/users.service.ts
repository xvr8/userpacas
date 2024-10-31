import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto'; // Ensure this path is correct or update it to the correct path
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  
  private async validateUserExists(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user || !user.isActive) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

 
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users.filter(user => user.isActive===true);
  }

  
  async findOne(id: number): Promise<User> {
    return this.validateUserExists(id);
  }

  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto as User);
    return newUser;
  }

  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
   
    await this.validateUserExists(id);
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async delete(id: number) {
    const user =await this.validateUserExists(id);
  

    user.isActive = false;
    return this.userRepository.create(user);
  }
  
}