import CustomError from './CustomError'
export class ExpectedError extends CustomError {
  constructor(public statusCode: number, public message: string) {
    super(message)
    Object.setPrototypeOf(this, ExpectedError.prototype)
  }
  errorDetails() {
    return [{ message: this.message }]
  }
}
