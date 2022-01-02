import { ValidationError } from 'express-validator'
import CustomError from './CustomError'

export class RequestValidatorError extends CustomError {
  statusCode = 400
  message = 'Provide vaild details'
  constructor(public error: ValidationError[]) {
    super('Error in database ')
    Object.setPrototypeOf(this, RequestValidatorError.prototype)
  }
  errorDetails() {
    return this.error.map((err) => {
      return { message: err.msg, field: err.param }
    })
  }
}
