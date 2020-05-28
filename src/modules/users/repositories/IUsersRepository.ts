import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserRepository from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviders from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(data?: IFindAllProviders): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserRepository): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
