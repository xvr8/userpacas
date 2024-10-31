import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/users/services/users.service';
import { UserRepository } from '../../../src/users/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { User } from '../../../src/users/entities/user.entity';

describe('UserService - delete', () => {
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
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia todos los mocks después de cada prueba
  });

  it('debería desactivar un usuario existente', async () => {
    const user = { id: 1, name: 'Usuario a Eliminar', isActive: true };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as User);
    jest.spyOn(userRepository, 'create').mockResolvedValue({ ...user, isActive: false } as User);

    const result = await userService.delete(1);
    expect(result.isActive).toBe(false);
  });

  it('debería lanzar NotFoundException si el usuario no existe', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null as unknown as User);

    await expect(userService.delete(99)).rejects.toThrow(NotFoundException);
  });
});
