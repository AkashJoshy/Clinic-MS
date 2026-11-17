export interface IKycEncryptionService {
  encrypt(value: string): string;
  decrypt(encryptedValue: string): string;
}
