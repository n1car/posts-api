import {
  AuthenticateUserDTO,
  CreateUserDTO,
  UpdateUserDTO,
  User,
} from './auth.types';

export class AuthRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  getUserById = (userId: string): User | null => {
    const userFound = this.users.find((user) => user.id === userId);

    return userFound ?? null;
  };

  getUserByEmail = (email: string): User | null => {
    const userFound = this.users.find((user) => user.email === email);

    return userFound ?? null;
  };

  getUserByEmailAndPassword = (authUser: AuthenticateUserDTO): User | null => {
    const userFound = this.users.find(
      (user) =>
        user.email === authUser.email && user.password === authUser.password
    );

    return userFound ?? null;
  };

  createUser = (data: CreateUserDTO): User => {
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

  updateUser = (user: UpdateUserDTO): User => {
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
