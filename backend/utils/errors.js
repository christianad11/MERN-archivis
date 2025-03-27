export class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(message = 'Bad Request') {
      super(message, 400);
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message = 'Resource Not Found') {
      super(message, 404);
    }
  }
