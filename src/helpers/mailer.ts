import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

export const sendEmail = async({email, emailType, userId}:any)=> {
  try {

      const hashedToken = await bcryptjs.hash(userId.toString(), 10);

      if(emailType == "VERIFY"){
        await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              verifyToken: hashedToken,
              verifyTokenExpiry: Date.now() + 3600000
            }
          }
        )
      } else if(emailType == "RESET"){
        await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              forgotPasswordToken: hashedToken,
              forgotPasswordTokenExpiry: Date.now() + 3600000
            }
          }
        )
      }

      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "efc026348ba158",
          pass: "73386681022d24"
        }
      });

      transport.verify(function (error, success) {
        if (error) {
          console.log("Transporter Error:", error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

      const mailOptions = {
        from: 'udayd@gmail.com',
        to: email,
        subject: emailType == 'VERIFY' ? "Verify your email" : "Reset your Password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType=='VERIFY' ? "verify your email" : "reset your password"} or copy and paste the link below in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`
      }

      const mailResponse = await transport.sendMail(mailOptions);

      return mailResponse;
  } catch (error:any) {
      throw new Error(error.message);
  }
}