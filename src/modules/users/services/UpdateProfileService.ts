import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from 'modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  email: string;
  name: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    user_id,
    email,
    name,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found', 401);

    if (user.email !== email) {
      const userWithUpdatedEmail = await this.usersRepository.findByEmail(
        email,
      );

      if (userWithUpdatedEmail)
        throw new AppError(`Cannot change the email to another user's email`);
    }

    user.email = email;
    user.name = name;

    if (password && !old_password)
      throw new AppError(
        'You need to inform the old password to set a new password',
      );

    if (old_password && password) {
      const correctPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!correctPassword)
        throw new AppError(`The old password doesn't match`);

      const hashedPassword = await this.hashProvider.generateHash(password);

      user.password = hashedPassword;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
