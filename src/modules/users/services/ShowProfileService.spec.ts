import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Romero Gonçalves',
      email: 'testivus@gmail.com',
      password: '123456',
    });

    const loadedUser = await showProfile.execute({
      user_id: user.id,
    });

    expect(loadedUser.name).toBe('Romero Gonçalves');
    expect(loadedUser.email).toBe('testivus@gmail.com');
  });

  it('should be able to show profile of unexistent user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'lalalala',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
