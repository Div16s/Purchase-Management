import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// email configuration
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

const sendOTP = (username,email,OTP,callback) => {
    const mailOptions = {
        from:process.env.EMAIL,
        to:email,
        subject:"Email Verification OTP",
        text:`Dear ${username},

                Thank you for registering with our platform! To complete the email verification process, please use the following One-Time Password (OTP):
                
                Your OTP: ${OTP}
                
                Please enter this OTP in the verification page to verify your account. If you did not request this OTP, please ignore this email.
                
                Thank you for choosing our service!
        
        Best regards,
        PM`
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error",error);
            callback(error, null); // Pass error to the callback
        }
        else{
            console.log("Email sent",info.response);
            callback(null, "OTP Sent"); // Pass error to the callback
        }
    });
}

export default sendOTP;