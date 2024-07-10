import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from 'path';

interface OtpEntry {
  otp: string;
  timestamp: number;
}

interface ResetPasswordEntry{
  uid:string;
  timestamp: number;
}

const otpStore: { [key: string]: OtpEntry } = {};
const fpuuid: { [key: string]: ResetPasswordEntry } = {
  "abc":{uid:"abc",timestamp:123}
}; 

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PS,
  },
});

const generateOTP = (userIdentifier: string): string | undefined => {
  try {
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = Date.now();
    otpStore[userIdentifier] = { otp, timestamp };
    return otp;
  } catch (error) {
    console.log(error);
  }
};

const emailTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'email-otp-template.ejs'), 'utf8'));
const forgTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'forgotpass-template.ejs'), 'utf8'));

const sendEmail = (toEmail: string, data: any, template: ejs.TemplateFunction, subject: string) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: toEmail,
    subject: subject,
    html: template(data),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
    } else {
      console.log('OTP email sent:', info.response);
    }
  });
};

const verifyOTP = (userIdentifier: string, enteredOTP: string): boolean => {
  const storedOTP = otpStore[userIdentifier];

  if (!storedOTP) {
    return false;
  }

  const { otp, timestamp } = storedOTP;
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  if (otp === enteredOTP && timeDifference <= 600000) { // 10 minutes in milliseconds
    return true;
  } else {
    return false;
  }
};

const deleteOtp=(email:String)=>{
    delete otpStore[email.toString()]
}

export { generateOTP, sendEmail, verifyOTP,emailTemplate,forgTemplate,deleteOtp,otpStore,fpuuid};
