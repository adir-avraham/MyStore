require('dotenv').config();
const exprees = require('express');
const router = exprees.Router();
const nodemailer = require("nodemailer");



router.post('/', async (req, res, next) => {

  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.json({message: "Please complete the form", status: false});    
    const output = `<p><strong>Message:</strong> ${message}</p>
    <p><strong>From:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>`
        
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: 'my-store-app@hotmail.com', 
        pass: process.env.PASS 
      }
    });
      
    const info = await transporter.sendMail({
      from: '"My Store 🛒" <my-store-app@hotmail.com>', 
      to: "adir.avraham@gmail.com", 
      subject: `You have a new message from ${name}`, 
      text: "Hello",
      html: output 
      }, (err, info) => {
        if (err) return res.json({message: "We're sorry! your message failed..", status: false});
        res.json({message: "Your message has been sent successfully!", status: true});
    });
    
    } catch (error) {
      res.json({error: error.message});
  }
        
});
    
module.exports = router;