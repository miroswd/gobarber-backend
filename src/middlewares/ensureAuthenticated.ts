import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validando JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  // separando o bearer do token

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    // console.log(decoded); iat = criação, exp = quando vai ser expirado, sub = assinatura

    const { sub } = decoded as TokenPayload; // Forçando o tipo da variável

    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
