import sgMail from '@sendgrid/mail';
import {User} from "@interfaces/users.interface";
import {Request, Response} from "express";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  public async sendEmail(mailOptions: sgMail.MailDataRequired | sgMail.MailDataRequired[]): Promise<void> {
    try {
      await sgMail.send(mailOptions);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  public async sendVerificationEmail(user: User, req : Request, res: Response): Promise<void> {
    try {
      const token = ''; // TODO: //
      // const token = user.generateVerificationToken() || '';

      // Save the verification token
      // await token.save();

      const subject = 'Account Verification Token';
      const to = user.email;
      const from = 'rockpaperscissors@example.com';
      const link = 'http://localhost:8080/api/auth/verify/' + token;
      const html = `
            <p>Hi ${user.username}<p><br>
            <p>Please click on the following <a href="${link}">link</a> to verify your account.</p><br>
            <p>If you did not request this, please ignore this email.</p>`;

      const emailRequest = this.sendEmail({ to, from, subject, html });
      console.log({ emailRequest });
      res.status(200).json({ message: 'A verification email has been sent to ' + user.email + '.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export default EmailService;
