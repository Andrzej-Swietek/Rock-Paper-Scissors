import UserService from "@services/user.service";
import {NextFunction, Request, Response} from "express";
import {User} from "@interfaces/users.interface";

class UserController {

  private userService = new UserService();

  public getUser = async (req: Request, res: Response, next: NextFunction)=>  {
    try {
      const uuid = req.params.id;
      const user: User = await this.userService.findUserByUUID(uuid);

      res.status(200).send({
        data: user,
        message: 'success'
      })
    } catch (error) {
      next(error);
    }
  }

  public getUsers =  async (req: Request, res: Response, next: NextFunction)=> {
    try {
      const data: User[] = await this.userService.findAllUser();
      res.status(200).send({
        data: [...data],
        message: 'success'
      })
    } catch (error) {
      next(error);
    }
  }

  public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, profile } = await this.userService.getUserProfile(req.params.username);
      res.status(200).send({
        data: {
          user,
          profile
        },
        message: 'success'
      })

    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
