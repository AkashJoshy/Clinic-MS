export interface IHashService {
  hash(value: string, label: string): Promise<string | undefined>;
  compare(
    value: string,
    hashedValue: string,
    label: string
  ): Promise<boolean | undefined>;
}
