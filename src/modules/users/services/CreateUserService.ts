
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  provider: boolean;
}
@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider : IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
    ){ }

  public async execute({ name, email, password, provider }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);


    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      provider,
      
    });
   

    await this.cacheProvider.invalidatePrefix('providers-list');
        
    return user;
  }
}

export default CreateUserService;
