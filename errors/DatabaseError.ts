import CustomError from './CustomError'

export class DatabaseError extends CustomError {
  statusCode = 500
  message = 'Internal server error. Sorry for inconvenience.'
  constructor() {
    super('Error in database ')
    Object.setPrototypeOf(this, DatabaseError.prototype)
  }
  errorDetails() {
    return [{ message: this.message }]
  }
}
