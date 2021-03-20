
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository :FakeUsersRepository;
let fakeHashProvider :FakeHashProvider;
let updateProfile: UpdateProfileService;


describe('UpdateProfile', () => {
beforeEach(() =>{
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile  =  new UpdateProfileService(
         fakeUsersRepository,
         fakeHashProvider,
        );
})

    it('should be able updatetheprofile', async () => {
        

        const user = await fakeUsersRepository.create({
            name: 'Danylo Oliveira',
            email:  'danylo.oliveira73@gmail.com',
            password: '123456',
        });

      const updatedUser =  await updateProfile.execute({
            user_id: user.id,
            name:  'Danylo Pereira',
            email: 'danylo.oliveira73@gmail.com',

            });

            expect(updatedUser.name).toBe('Danylo Pereira');
            expect(updatedUser.email).toBe('danylo.oliveira73@gmail.com');
    });

    it('should not be able to update the profile from a non-existing user', async () => {
        await expect(
          updateProfile.execute({
            user_id: 'non-existing-user-id',
            name: 'Test',
            email: 'test@example.com',
          }),
        ).rejects.toBeInstanceOf(AppError);
      });

    it('should not be able to change to another user email', async () => {
        

        await fakeUsersRepository.create({
            name: 'Danylo Oliveira',
            email:  'danylo.oliveira73@gmail.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email:  'test@example.com',
            password: '123456',
        });
          await  expect(
                updateProfile.execute({
                user_id: user.id,
                name: 'Danylo Oliveira',
                email:  'danylo.oliveira73@gmail.com',
               })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'Danylo Oliveira',
            email:  'danylo.oliveira73@gmail.com',
            password: '123456',
        });

      const updatedUser =  await updateProfile.execute({
            user_id: user.id,
            name:  'Danylo Pereira',
            email: 'danylo.oliveira73@gmail.com',
            old_password: '123456',
            password: '123123',

            });

            expect(updatedUser.password).toBe('123123');
            
    });

    it('should not be able to update the password without old password', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'Danylo Oliveira',
            email:  'danylo.oliveira73@gmail.com',
            password: '123456',
        });

      
         await expect(updateProfile.execute({
                user_id: user.id,
                name:  'Danylo Pereira',
                email: 'danylo.oliveira73@gmail.com',
                password: '123123',
    
                })).rejects.toBeInstanceOf(AppError);
            
    });

    it('should not be able to update the password with wrong old password', async () => {
        
        const user = await fakeUsersRepository.create({
            name: 'Danylo Oliveira',
            email:  'danylo.oliveira73@gmail.com',
            password: '123456',
        });

      
         await expect(
                updateProfile.execute({
                user_id: user.id,
                name:  'Danylo Pereira',
                email: 'danylo.oliveira73@gmail.com',
                old_password:'wron-old-password',
                password: '123123',
    
                })).rejects.toBeInstanceOf(AppError);
            
    });
       
});