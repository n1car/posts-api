import { Pool } from 'pg'
import {
  AuthenticateUserDTO,
  CreateUserDTO,
  UpdateUserDTO,
  User,
} from './auth.types';

export class AuthRepository {
  private users: User[];
  private pool: Pool;

  constructor(pool: Pool) {
    this.users = User[];
    this.users = []
  }

  getUserById = async (userId: string): Promise<User> | null => {
    const userFound = this.users.find((user) => user.id === userId);

    return userFound ?? null;
  };

  getUserByEmail = async (email: string): Promise<User> | null => {
    const userFound = this.users.find((user) => user.email === email);

    return userFound ?? null;
  };

  getUserByEmailAndPassword = async (authUser: AuthenticateUserDTO): Promise<User> | null => {
    const userFound = this.users.find(
      (user) =>
        user.email === authUser.email && user.password === authUser.password
    );

    return userFound ?? null;
  };

  createUser = async (data: CreateUserDTO): Promise<User> => {
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      password: data.password,
      role: data.role,
      name: data.name ?? null,
      address: data.address ?? null,
    };

    this.users.push(newUser);
    return newUser;
  };

  updateUser = async (user: UpdateUserDTO): Promise<User> => {
    const { id, name, address } = user;
    const userIndex = this.users.findIndex((user) => user.id === id);

    const userAtIndex = this.users[userIndex];

    const updatedUser = {
      ...userAtIndex,
      name: name === undefined ? userAtIndex.name : name,
      address: address === undefined ? userAtIndex.address : address,
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  };
}
