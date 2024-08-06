import config from "../../config.js";

const language = config.LANGUAGE;

const HttpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

const errorsDictionary = {
  en: {
    SUCCESS: "Success",
    NOT_FOUND: "Not found",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
  },
  es: {
    SUCCESS: "Operacion exitosa",
    NOT_FOUND: "No encontrado",
    UNAUTHORIZED: "No autorizado",
    FORBIDDEN: "Acceso denegado",
    INTERNAL_SERVER_ERROR: "error Interno del servidor",
  },
};

export class HttpResponse {
  constructor() {
    this.lang = language;
  }

  Ok(res, data, msg = "") {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: {
        system: errorsDictionary[this.lang].SUCCESS,
        custom: msg,
      },
      data,
    });
  }

  NotFound(res, data, msg = "") {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: {
        system: errorsDictionary[this.lang].NOT_FOUND,
        custom: msg,
      },
      data,
    });
  }

  Unauthorized(res, data, msg = "") {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: {
        system: errorsDictionary[this.lang].UNAUTHORIZED,
        custom: msg,
      },
      error: data,
    });
  }

  Forbidden(res, data, msg = "") {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      message: {
        system: errorsDictionary[this.lang].FORBIDDEN,
        custom: msg,
      },
      error: data,
    });
  }

  ServerError(res, data, msg = "") {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: {
        system: errorsDictionary[this.lang].INTERNAL_SERVER_ERROR,
        custom: msg,
      },
      error: data,
    });
  }
}

export const httpResponse = new HttpResponse();
