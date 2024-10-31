import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/users/services/users.service';
import { UserRepository } from '../../../src/users/repositories/user.repository';
import { User } from '../../../src/users/entities/user.entity';

describe('UserService - findAll', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findAll: jest.fn(),
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

  it('debería retornar solo usuarios activos', async () => {
    const users: User[] = [
      { id: 1, name: 'Carlos', isActive: true, email: 'carlos@example.com', password: 'password1' },
      { id: 2, name: 'Ana', isActive: false, email: 'ana@example.com', password: 'password2' },
    ];

    jest.spyOn(userRepository, 'findAll').mockResolvedValue(users);

    const result = await userService.findAll();
    expect(result).toEqual([
      { id: 1, name: 'Carlos', isActive: true, email: 'carlos@example.com', password: 'password1' },
    ]);
  });
});
