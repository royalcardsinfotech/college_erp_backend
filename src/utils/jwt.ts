import jwt from 'jsonwebtoken'
import  {encryptionKey, ivkey, secretKey, tokenExpiryTime} from './secretkeys';
import crypto from 'crypto'
import { decrypt } from 'dotenv';

export const encryptData = (data: string, key: crypto.CipherKey, iv: crypto.BinaryLike): string => {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

export const generateEncryptedToken = async (roleId:string,userId:string,credId:string): Promise<string> => {
  
  const token = jwt.sign({roleId,userId,credId}, secretKey!, { expiresIn: tokenExpiryTime }); // Expires in 1 hour
  if (typeof token !== 'string') {
    throw new Error('Token generation failed');
  }


  const encryptedToken = encryptData(token,encryptionKey!, ivkey!);

  return encryptedToken;
};

export const decryptData=async(token:string):Promise<string>=>{
  
  const decipher=crypto.createDecipheriv('aes-256-cbc',encryptionKey!,ivkey!)

  let decryptedData=decipher.update(token,'hex','utf-8')
  decryptedData+=decipher.final('utf-8')
  return decryptedData
}

export const generateSignedCookie=(data:string):string=>{
  const signature=crypto.createHmac('sha256',encryptionKey!).update(data).digest('base64')
  const signedcookie=`${data}.${signature}`
  return signedcookie

}

