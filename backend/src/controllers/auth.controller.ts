import AuthService from "@services/auth.service";
import {NextFunction, Request, Response} from "express";
import {User} from "@interfaces/users.interface";
import {RequestWithUser} from "@interfaces/auth.interface";
import {CreateUserDto} from "@dtos/user.dto";

class AuthController {
  public authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {email} = req.body;

      // const user = await this.userService.findUserByEmail(email);
      // if (user) return this.userService.deleteUser(user._id);
      //
      // const newUser = await this.userService.createUser({ ...req.body });
      // await this.emailService.sendVerificationEmail(newUser, req, res);
    } catch (error) {
      next(error);
    }
  }

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.token) return res.status(400).json({message: 'We were unable to find a user for this token.'});

    try {
      // const token = await this.authService.getToken(req.params.token);
      //
      // if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });
      //
      // const user = await this.userService.findUserById(token.userId);
      //
      // if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });
      //
      // if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });
      //
      // this.userService.verifyUser(token.userId);

      res.status(200).send('The account has been verified. Please log in.');
    } catch (error) {
      next(error);
    }
  }


  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      // const signUpUserData: User = await this.authService.signup(userData);
      //
      // res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      // const { cookie, findUser } = await this.authService.login(userData);
      //
      // res.setHeader('Set-Cookie', [cookie]);
      // res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      // const userData: User = req.user;
      // const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      // res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

}
