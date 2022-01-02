import CustomError from './CustomError'

export class InsufficientDataError extends CustomError {
  statusCode = 500
  message = 'Error occured due to insufficient data'
  constructor() {
    super('Error occured due to insufficient data')
    Object.setPrototypeOf(this, InsufficientDataError.prototype)
  }
  errorDetails() {
    return [{ message: this.message }]
  }
}
