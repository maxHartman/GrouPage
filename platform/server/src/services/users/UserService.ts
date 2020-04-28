import { GeneralError } from "../../errors/GeneralError";
import { SignupUserParams, User } from "../../types";
import UserErrors from "./UserErrors";
import { UserManager } from "./UserManager";

export class UserService {
  private userManager: UserManager;

  constructor() {
    const userManager = new UserManager();
    this.userManager = userManager;
  }

  async signupUser(params: SignupUserParams): Promise<void> {
    if (await this.userManager.userExists(params.username)) {
      throw new GeneralError(UserErrors.USERNAME_ALREADY_EXISTS, {
        username: params.username,
      });
    }

    await this.userManager.addUser(params);
  }

  async logoutUser(req: Express.Request): Promise<void> {
    req.logout();
    return new Promise((resolve) => req.session.destroy(resolve));
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userManager.getUser(username);
    if (user == null) {
      throw new GeneralError(UserErrors.USER_NOT_FOUND, {
        username,
      });
    }
    return user;
  }
}
