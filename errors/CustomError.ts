export default abstract class CustomError extends Error {
  abstract message: string
  abstract statusCode: number
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
  abstract errorDetails(): { message: string; field?: string }[]
}
