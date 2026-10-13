import crypto from "crypto"

export const generateOTP = (length: number = 6): string => {
    const max = 10 ** length
    const min = 10 ** (length - 1)
    const randomBytes = crypto.randomInt(min, max)
    return randomBytes.toString()
}
