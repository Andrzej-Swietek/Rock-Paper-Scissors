import {Router} from "express";

// Interfaces
import {Routes} from "@interfaces/routes.interface";

// Controllers
import UserController from "@controllers/user.controller";

// Middleware
import authenticatedMiddleware from "@middlewares/authenticated.middleware";

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`,  authenticatedMiddleware, this.userController.getUsers)
    this.router.get(`${this.path}/:id`,  authenticatedMiddleware, this.userController.getUser)
    this.router.get(`${this.path}/profile/:username`,  authenticatedMiddleware, this.userController.getUserProfile)
  }
}

export default UserRoute;
