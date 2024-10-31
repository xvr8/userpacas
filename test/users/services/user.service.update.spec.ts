import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/users/services/users.service';
import { UserRepository } from '../../../src/users/repositories/user.repository';
import { UpdateUserDto } from '../../../src/users/dto/update-user.dto';
import { User } from '../../../src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserService - update', () => {
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
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar todos los mocks después de cada prueba
  });

  it('debería actualizar un usuario existente', async () => {
    const updateUserDto: UpdateUserDto = { name: 'Usuario Actualizado' };
    const user = { id: 1, name: 'Carlos', isActive: true, email: 'test@example.com', password: 'password' };
    const updatedUser = { ...user, ...updateUserDto };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as User);
    jest.spyOn(userRepository, 'update').mockResolvedValue(updatedUser as User);

    const result = await userService.update(1, updateUserDto);
    expect(result).toEqual(updatedUser);
  });

  it('debería lanzar NotFoundException si el usuario no existe', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    await expect(userService.update(99, { name: 'Error Test' })).rejects.toThrow(NotFoundException);
  });
});
