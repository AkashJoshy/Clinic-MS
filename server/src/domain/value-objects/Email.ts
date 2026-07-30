import { InvalidEmailError } from "../errors/invalid-email.error.js"

export class Email {
    private readonly _value: string
    constructor(private _email: string) {
        this._value = _email
    }
    
    static create(email: string): Email {
        if (!email) {
            throw new Error("Email required!")
        }
        const normalizedEmail = email.trim().toLowerCase()
        const [prefix, ...pattern] = normalizedEmail.split("@")

        if (prefix?.length! < 3 || !Email.isValid(normalizedEmail)) {
            throw new InvalidEmailError()
        }
        return new Email(normalizedEmail)
    }

    private static isValid(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    getValue(): string {
        return this._value;
    }

}