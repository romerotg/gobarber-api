import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Romero Gonçalves',
      email: 'testivus@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Ramiro',
      email: 'ramirão@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.name).toBe('Ramiro');
    expect(updatedUser.email).toBe('ramirão@gmail.com');
    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update profile of unexistent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: '123',
        name: 'Ramiro',
        email: 'ramirão@gmail.com',
        old_password: '123456',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`should not be able to change to another user's email`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'Romero Gonçalves',
      email: 'testivus@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Ramiro',
      email: 'ramirão@gmail.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: user2.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password when not informing old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Romero Gonçalves',
      email: 'testivus@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Romero Gonçalves',
      email: 'testivus@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Ramiro',
        email: 'ramirão@gmail.com',
        old_password: 'alalallala',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
