import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider : FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUsers  : CreateUsersService;

describe('CreateUsers', () => {
beforeEach(() =>  {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    
    createUsers = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
})
    it('should be able to create a new user', async () => {
        
            const users = await createUsers.execute({
            name: 'Danylo',
            email: 'john@example.com',
            password: 'danylo93',

            });

        await expect(users).toHaveProperty('id');
            
    });
    it('should not be able to create a new user with same email from another', async () => {
         await createUsers.execute({
            name: 'Danylo',
            email: 'john@example.com',
            password: 'danylo93',

            });

         await  expect(
                createUsers.execute({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: '12345',
    
                }),
            ).rejects.toBeInstanceOf(AppError);
            
    });
    
});