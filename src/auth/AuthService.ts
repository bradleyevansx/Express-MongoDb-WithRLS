import { Role } from "../../models/enums/Role";
import { User } from "../../models/User";
import { IRepository } from "../repositories/RepositoryContract";
import { IAuth } from "./IAuth";
import jwt from "jsonwebtoken";

export class AuthService implements IAuth {
  private userRepository: IRepository<User>;

  constructor(userRepository: IRepository<User>) {
    this.userRepository = userRepository;
  }

  async tryLoginAsync(
    username?: string,
    password?: string,
    jwt?: string
  ): Promise<string | null> {
    if (jwt && (!username || !password)) {
      try {
        const token = this.unsignToken(jwt) as {
          userId: string;
          role: Role;
        };
        const newToken = this.signToken({
          userId: token.userId,
          role: token.role,
        });
        return newToken;
      } catch (error) {
        return null;
      }
    } else if (username && password) {
      const user = await this.userRepository.getWhereAsync({
        username: username,
        password: password,
      });
      if (user.length === 0) {
        return null;
      }
      const token = this.signToken({
        userId: user[0]._id.toString(),
        role: user[0].role,
      });
      return token;
    }
    return null;
  }
  async tryRegisterAsync(
    username: string,
    password: string
  ): Promise<{ token: string; response: string }> {
    if (!username || !password)
      return { token: "", response: "Must input username and password" };
    const existingUsername = await this.userRepository.getWhereAsync({
      username: username,
    });

    if (existingUsername.length > 0) {
      return { token: "", response: "Username already exists" };
    }

    const newUser = {
      username: username,
      password: password,
      role: Role.User,
    };
    const response = await this.userRepository.postAsync(newUser as User);
    const token = this.signToken({
      userId: response,
      role: newUser.role,
    });
    return { token: token, response: "User created" };
  }
  private signToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
  }

  private unsignToken(token: string) {
    const response = jwt.verify(token, process.env.JWT_SECRET!);
    return response;
  }
}
