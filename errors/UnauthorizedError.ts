import CustomError from './CustomError'
export class UnauthorizedError extends CustomError {
  statusCode = 401
  message = 'Unauthorized request'
  constructor() {
    super('Unauthorized request from')
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
  errorDetails() {
    return [{ message: this.message }]
  }
}
