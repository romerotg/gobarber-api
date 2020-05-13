import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserRepository from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserRepository): Promise<User>;
  save(user: User): Promise<User>;
}
