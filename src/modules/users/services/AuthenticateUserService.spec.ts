import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Romero Gonçalves',
      email: 'testivus@gmail.com',
      password: '123456',
    });

    const auth = await authenticateUser.execute({
      email: 'testivus@gmail.com',
      password: '123456',
    });

    expect(auth.user).toBe(user);
  });

  it('should not be able to authenticate unregistered email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'testivus@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await createUser.execute({
      name: 'Romero Gonçalves',
      email: 'testivus@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'testivus@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
