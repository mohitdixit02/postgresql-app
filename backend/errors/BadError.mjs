import CustomError from "./CustomError.mjs";
class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400;
  }
}

export default BadRequestError;