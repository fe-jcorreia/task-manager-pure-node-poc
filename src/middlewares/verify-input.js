import { AppError } from "../app-error.js";

export function verifyInput(request, response) {
  if (!request.body) {
    throw new AppError({ code: 400, message: "Incorrect JSON body parsing" });
  }

  const data = request.body;

  if (!data.title || typeof data.title !== "string") {
    throw new AppError({ code: 400, message: "O campo title é obrigatório" });
  }

  if (!data.description || typeof data.description !== "string") {
    throw new AppError({
      code: 400,
      message: "O campo description é obrigatório",
    });
  }
}
