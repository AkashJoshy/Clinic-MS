export interface IHashService {
  hashPassword(password: string): Promise<string | undefined>;
  comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean | undefined>;
}
