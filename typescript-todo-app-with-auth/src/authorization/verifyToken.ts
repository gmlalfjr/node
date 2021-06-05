import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'
import * as dotenv from "dotenv";

dotenv.config();
const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log(token, 'log token');
  if (!token) {
    return res.status(401).send({
      data: {},
      message: 'No token, authorizaton denied',
      statusCode: 401,
      code: 'UNAUTHORIZED',
      ok: false,
    });
  }

  try {
    if (typeof token !== 'undefined') {
      const bearer = token.split(' ');
      if (bearer == null) {
        return res.status(401).send({
          data: {},
          message: 'No Bearer, authorizaton denied',
          statusCode: 401,
          code: 'Invalid Bearer',
          ok: false,
        });
      }
      const bearerToken = bearer[1];
      console.log(bearerToken, 'bearer token');
      const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET ?? '');
      Object.assign(req, { user: decoded })
      next();
    }
  } catch (e) {
    return res.status(403).send({
      data: {},
      message: e.message,
      statusCode: 403,
      code: 'FORBIDDEN',
      ok: false,
    });
  }
};

export default authorization;
