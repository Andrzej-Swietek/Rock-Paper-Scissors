import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const bodyValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    next();
  }
};

export default bodyValidatorMiddleware;
