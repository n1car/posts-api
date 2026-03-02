import { AuthRepository } from './auth.repository';
import {
  AuthenticateUserDTO,
  CreateUserDTO,
  UpdateUserDTO,
  User,
} from './auth.types';
import Boom from '@hapi/boom';

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  getUserById = async (userId: string): Promise<User> => {
    const userFound = await this.authRepository.getUserById(userId);

    if (!userFound) {
      throw Boom.notFound('User not found');
    }

    return userFound;
  };

  authenticateUser = (credentials: AuthenticateUserDTO): User => {
    const userFound =
      this.authRepository.getUserByEmailAndPassword(credentials);

    if (!userFound) {
      throw Boom.unauthorized('Invalid credentials');
    }

    return userFound;
  };

  createUser = (data: CreateUserDTO): User => {
    const emailTaken = this.authRepository.getUserByEmail(data.email);

    if (emailTaken) {
      throw Boom.conflict('Email already in use');
    }

    const newUser = this.authRepository.createUser({
      email: data.email,
      password: data.password,
      role: data.role,
      name: data.name,
      address: data.address,
    });

    return newUser;
  };

  updateUser = (user: UpdateUserDTO): User => {
    const { id, name, address } = user;
    const userExists = this.authRepository.getUserById(id);

    if (!userExists) {
      throw Boom.notFound('User not found');
    }

    const userUpdated = this.authRepository.updateUser({
      id,
      name,
      address,
    });

    return userUpdated;
  };
}
