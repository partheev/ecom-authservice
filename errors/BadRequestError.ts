import CustomError from './CustomError'

export class BadRequestError extends CustomError {
  statusCode = 400
  message = 'Bad Request.'
  constructor() {
    super('Bad Request.')
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
  errorDetails() {
    return [{ message: this.message }]
  }
}
