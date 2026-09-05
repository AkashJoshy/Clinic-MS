export interface IMailService {
  sendMail(to: string, subject: string, body: string, otp?: string ): Promise<boolean | undefined>
}
