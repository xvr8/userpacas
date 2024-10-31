import { Test, TestingModule } from '@nestjs/testing';
import * as globals from '@jest/globals';
import { UserService } from '../../../src/users/services/users.service';
import { UserRepository } from '../../../src/users/repositories/user.repository';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { User } from '../../../src/users/entities/user.entity';

describe('UserService - create', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: globals.jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    // Limpia los mocks después de cada prueba para evitar efectos secundarios
    globals.jest.clearAllMocks();
  });

  afterAll(async () => {
    // Cierra el módulo de prueba para limpiar recursos pendientes
    await globals.jest.restoreAllMocks();
  });

  it('debería crear un nuevo usuario', async () => {
    const createUserDto: CreateUserDto = { name: 'Nuevo Usuario', email: 'nuevo@usuario.com', password: '1234' };
    const user = { id: 1, ...createUserDto, isActive: true };
    globals.jest.spyOn(userRepository, 'create').mockResolvedValue(user as User);

    const result = await userService.create(createUserDto);
    expect(result).toEqual(user);
  });
});
