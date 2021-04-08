import { Request, Response} from 'express';

import { parseISO } from 'date-fns';

import {classToClass} from "class-transformer"

import { container} from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';


export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response>{

        const { name, email, password, provider } = request.body;


  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
    name,
    email,
    password,
    provider,
  });

  

  return response.json(classToClass(user));




    }
}
