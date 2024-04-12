export interface IAuth {
  tryLoginAsync(
    username: string,
    password: string,
    token?: string
  ): Promise<string | null>;
  tryRegisterAsync(
    username: string,
    password: string
  ): Promise<{ token: string; response: string }>;
}
