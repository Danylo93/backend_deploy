import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeMailProvider : FakeMailProvider;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() =>{
         fakeUsersRepository = new FakeUsersRepository();
         fakeMailProvider = new FakeMailProvider();
         fakeUserTokensRepository = new FakeUserTokensRepository();
         sendForgotPasswordEmail  =  new SendForgotPasswordEmailService(
             fakeUsersRepository,             
            fakeUserTokensRepository,
            fakeMailProvider,
            );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        await fakeUsersRepository.create({
            name: 'John Doe',
            email:'john@example.com',
            password: '123456',
        })
           
       await sendForgotPasswordEmail.execute({
            email: 'john@example.com',
           });

       await  expect(sendMail).toHaveBeenCalled();
            
    });
    it('should not be able to recover a non-existing user password', async() =>{
        await expect(
                sendForgotPasswordEmail.execute({
                email: 'john@example.com',
            })).rejects.toBeInstanceOf(AppError)
    });
    
    it('should generate a forgot password token', async () =>{
     const generate = jest.spyOn(fakeUserTokensRepository, 'generate');
     const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email:'john@example.com',
            password: '123456',
        });
           
       await sendForgotPasswordEmail.execute({
            email: 'john@example.com',
           });

      expect(generate).toHaveBeenCalledWith(user.id);
    });





});