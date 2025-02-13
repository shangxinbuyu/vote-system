const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+=\-.]{8,20}$/

export function emailTest(email: string): boolean {
   return emailRegex.test(email)
}
export function passwordTest(password: string): boolean {
    return PasswordRegex.test(password)
}