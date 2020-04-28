import { SignupUserParams, User } from "../../types";

const users = {};

export class UserManager {
  // TODO impl
  async addUser(params: SignupUserParams): Promise<void> {
    const { username } = params;

    users[username] = params;
  }

  async userExists(username: string): Promise<boolean> {
    return users[username] != null;
  }

  async getUser(username: string): Promise<User> {
    return users[username];
  }
}
