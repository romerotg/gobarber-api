import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Romero Gonçalves',
      email: 'testivus@gmail.com',
      password: '123456',
    });

    const user1 = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'User 2',
      email: 'user2@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
