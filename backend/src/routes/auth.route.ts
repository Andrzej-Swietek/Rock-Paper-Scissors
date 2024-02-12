import { Router } from 'express';
import { check, validationResult } from 'express-validator';

// Interface
import { Routes } from '@interfaces/routes.interface';

// Controllers
import AuthController from "@controllers/auth.controller";

// DTO
import {CreateUserDto} from "@dtos/user.dto";

// Middleware
import validationMiddleware from '@middlewares/validation.middleware';
import authenticatedMiddleware from "@middlewares/authenticated.middleware";

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto, 'body'),  this.authController.register);
    this.router.post(
      `${this.path}/login`,
      check('email').isEmail().withMessage('Enter a valid email address'),
      check('password').not().isEmpty(),
      this.authController.login
    );
    this.router.post(`${this.path}/logout`, authenticatedMiddleware,  this.authController.logout);
    this.router.get(`${this.path}/verify/:token`, this.authController.verify);
  }
}

export default AuthRoute;
