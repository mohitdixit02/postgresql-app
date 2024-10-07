import CustomError from "./CustomError.mjs";
class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.status = 401;
  }
}

export default UnauthorizedError;