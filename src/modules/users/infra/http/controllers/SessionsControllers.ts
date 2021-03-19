import { Request, Response} from 'express';
import { classToClass} from 'class-transformer'
import { container} from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response>{

        const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,

  });

  const userWithoutPassword = {
    id: user.id,
    avatar_url: user.avatar
  ? `${process.env.APP_API_URL}/files/${user.avatar}`
  : null,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ user: classToClass(user), token });

    }
}
