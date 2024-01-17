export class AppError extends Error {
  constructor(options) {
    super(options.message);

    this.message = options.message;
    this.code = options.code;
  }
}

export function errorMapper(error) {
  return { message: error.message, code: error.code };
}
