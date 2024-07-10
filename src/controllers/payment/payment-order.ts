import { NextFunction, Response } from "express";
import { CustomRequest } from "../../utils/customrequest";
import { apiUrl, razorpay_id, razorpay_secret } from "../../utils/secretkeys";
import Razorpay from "razorpay";
import crypto from 'crypto'
import { PDFDocument, rgb ,StandardFonts} from 'pdf-lib'
import fs from 'fs'
import {v4} from 'uuid'
import { createError, createResponse } from "../../utils/response-handler";
import path from "path";
import ejs from "ejs";
import pdf from "html-pdf"





const razorpay = new Razorpay({
  key_id: razorpay_id!,
  key_secret: razorpay_secret!,
});

// creating order on razorpay
export const createOrder=async (req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
      // creating receipt id
      const id=v4()

        const options = {
            amount: req.body.amount, // Amount in paise
            currency: "INR",
            receipt: id,
          };
          const response = await razorpay.orders.create(options);
    res.json(createResponse("order created",{
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      rid:id
    }));
    } catch (error) {

      
        res.status(500).json(createError(500,"error","internal server error"));
    }
}


// Function to generate PDF from EJS template
export const processPayment=async (req:CustomRequest,res:Response,next:NextFunction)=>{
  try {
    const { payment_id, order_id, signature, prefill ,receipt_id} = req.body;


    const receipt = {
      receipt_id: receipt_id,
      payment_id,
      order_id,
      amount: 50000, 
      created_at: new Date(),
      name: prefill.name,
      email:prefill.email,
      contact:prefill.contact,
    };
  
    // creating receipt  directory
    const receiptsDir = path.join(__dirname,"..","..", "receipts");
    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir);
    }
    const pdfPath = path.join(receiptsDir, `receipt-${receipt.receipt_id}.pdf`);
    const templatePath = path.join(__dirname, 'invoice.ejs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Render the EJS template with data
    const html = ejs.render(template, { ...receipt });
    const options = {
      format: 'Letter',
      border: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    };

  
    pdf.create(html).toFile(pdfPath, (err, response) => {
      if (err) throw err;
      return  res.json({ ...receipt, pdflink:apiUrl+`/receipts/receipt-${receipt.receipt_id}.pdf` });
      // console.log('PDF created successfully:', response.filename);
    });

  
    
  
  
  } catch (error) {
console.log(error)
    res.status(500).json(createError(500,"error","internal server error"));

  }

}