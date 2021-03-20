import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AutheticateUsersService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


let fakeUsersRepository : FakeUsersRepository;
let fakeHashProvider :FakeHashProvider;
let authenticateUsers : AutheticateUsersService;



describe('AuthenticateUser', () => {
beforeEach (() => { 
     fakeUsersRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider();


     
     authenticateUsers  =  new AutheticateUsersService(
        fakeUsersRepository,
         fakeHashProvider,);
});

    it('should be able to authenticate', async () => {
               
        const user = await fakeUsersRepository.create({
            name: 'Danylo Oliveira',
            email: 'john@example.com',
            password: '123456',

            });
                
        const response = await authenticateUsers.execute({
            email: 'john@example.com',
            password: '123456',
            });

      await expect(response).toHaveProperty('token');
            
    });

    it('should not be able to authenticate with non existing user', async () => {
              
    await expect(authenticateUsers.execute({
                email: 'john@example.com',
                password: '123456',
                })).rejects.toBeInstanceOf(AppError)        
    });

    it('should not be able to authenticate with wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'Danylo Oliveira',
            email: 'john@example.com',
            password: '123456',

            });
                
    await expect(authenticateUsers.execute({
                email: 'john@example.com',
                password: 'wrong-password',
                })).rejects.toBeInstanceOf(AppError);
            
    });
    
    
});