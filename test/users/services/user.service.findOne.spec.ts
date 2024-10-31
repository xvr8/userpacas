import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/users/services/users.service';
import { UserRepository } from '../../../src/users/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { User } from '../../../src/users/entities/user.entity';

describe('UserService - findOne', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba para evitar interferencias.
  });

  it('debería retornar un usuario existente', async () => {
    const user: User = { id: 1, name: 'Carlos', isActive: true, email: 'carlos@example.com', password: 'password123' };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

    const result = await userService.findOne(1);
    expect(result).toEqual(user);
  });

  it('debería lanzar NotFoundException si el usuario no existe', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    await expect(userService.findOne(99)).rejects.toThrow(NotFoundException);
  });
});

