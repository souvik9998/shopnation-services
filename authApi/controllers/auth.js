import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../connections/db.js";
import {v4 as uuidv4} from 'uuid';
import twilio from 'twilio';



export const register = async(req,res) =>{
    console.log(req.body)
    try{
        const {name,email,mobileNumber,password,confirmPassword} = req.body;
        if(!name || !email || !mobileNumber || !password || !confirmPassword){
            return res.status(401).json({msg:'please provide all the information'})
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: 'Password and confirmPassword do not match' });
        }
        
        if (!isValidEmail(email)) {
            console.log('invalid error');
            return res.status(400).json({ msg: 'Invalid email format' });
        }
        db.query('select email from user where email = ?',[email], (error,results) =>{
            if(error){
                console.log(error);
                return res.status(500).json({ msg: 'Internal server error' });
            }
            if(results.length > 0){
                return res.status(400).json({msg:"email already in use"})
            }
        });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        db.query('insert into user set ?', {user_id: uuidv4(), user_name:name, email:email, mobile_number:mobileNumber, password:passwordHash},(error,results)=>{
            if(error){
                console.log(error)
            }
            else{
                return res.status(201).json({msg:"successfully registered"})
            }
        })
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    try {
        console.log(req.body);
      const { email, password } = req.body;
      if(!email || !password){
        return res.status(401).json({msg:'please provide email and password'})
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ msg: 'Invalid email format' });
      }
        db.query('select * from user where email = ?',[email],async(error,rows,fields) =>{
            if(error){
                console.log(error);
                return res.status(500).json({ msg: 'Internal server error' });
            }
            if(rows.length === 0) {
                console.log("You havn't registered yet")
                return res.status(400).json({ msg: "You havn't registered yet" });
            }
            var password_hash=rows[0]['password'];
            console.log(password_hash);
            const isMatch = await bcrypt.compare(password,password_hash);
            console.log(isMatch);
            if(!isMatch) return res.status(400).json({ msg: "Please give correct password" });
            const token = jwt.sign({ name: rows[0].user_id }, process.env.JWT_SECRET);
            res.status(200).json({
                msg:"login successfull",
                token,
                user: rows[0]
            });
        });
        
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
export const isAuthorized = async(req,res) =>{
    try{
        const userId = req.user.name;
        let user;
        console.log(userId);
        await db.query('SELECT * FROM user WHERE user_id = ?', [userId],(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                user = result[0]
                res.status(200).json({user,msg:"authorized"});
            }
        })
    }
    
    catch(err){
        res.status(500).json({msg:err.message})
    }
}

export const updateUser = async(req,res) =>{
    try{
        const userId = req.params.userId;
        const updates = req.body;

        const updateValue = Object.values(updates);

        await db.query(`update user set ${Object.keys(updates)} = ? where user_id = ?`,[updateValue,userId],async(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.status(200).json({msg:'successfully updated'})
            }
        })
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
}
const accountSid = 'AC7c87a1a4eeaa86ff48df61f64c516068';
const authToken = '268591f2348674b9730b454501e1dd0b';
const twilioPhoneNumber = '+19078918964';

const twilioClient = new twilio(accountSid, authToken);

// Generate a random OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
export const forgotPassword = async(req, res) => {
    try {
      console.log(req.body);
        const { mobileNumber } = req.body;
        if (!mobileNumber) {
          return res.status(400).json({ msg: 'Please provide your mobile number' });
        }
    
        // Check if the mobile number exists in your database
        db.query('SELECT * FROM user WHERE mobile_number = ?', [mobileNumber], async (error, results) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Internal server error' });
          }
    
          if (results.length === 0) {
            return res.status(400).json({ msg: 'Mobile number not found' });
          }
    
          // Generate a unique OTP
          const otp = generateOTP();
          const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
          console.log(results);
          // Insert the OTP record into the database
          db.query(
            'INSERT INTO password_reset_tokens (id,user_id, token, expiry_timestamp) VALUES (?,?, ?, ?)',
            [uuidv4(),results[0].user_id, otp, otpExpiry],
            async (error, _results) => {
              if (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Internal server error' });
              }
    
              // Send the OTP via Twilio
              twilioClient.messages
                .create({
                  body: `Your OTP for password reset is: ${otp}`,
                  from: twilioPhoneNumber,
                  to: `+91${mobileNumber}`,
                })
                .then(() => {
                  return res.status(200).json({ msg: 'OTP sent successfully' });
                })
                .catch((error) => {
                  console.error('Error sending OTP via Twilio:', error);
                  return res.status(500).json({ msg: 'Failed to send OTP' });
                });
            }
          );
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };


  export const verifyOTP = async(req,res)=>{
    try {
        const { otp, mobileNumber } = req.body; // Assuming you receive the mobileNumber along with OTP
        if (!otp || !mobileNumber) {
          return res.status(400).json({ msg: 'Please provide both OTP and mobile number' });
        }
    
        // Check if the OTP is valid and not expired
        db.query(
          'SELECT * FROM password_reset_tokens WHERE user_id = (SELECT user_id FROM user WHERE mobile_number = ?) AND token = ? AND expiry_timestamp >= NOW()',
          [mobileNumber, otp],
          async (error, results) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ msg: 'Internal server error' });
            }
    
            if (results.length === 0) {
              return res.status(400).json({ msg: 'Invalid or expired OTP' });
            }
    
            // If OTP is valid, you can handle further actions like allowing the user to reset their password
    
            return res.status(200).json({ msg: 'OTP verified successfully' });
          }
        );
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

  export const createNewPassword = async(req,res)=>{
    try {
        console.log(req.body);
        const {mobileNumber } = req.body;
        const {newPassword, confirmPassword} = req.body.password;
        console.log(newPassword);
        if (!mobileNumber || !newPassword || !confirmPassword) {
          return res.status(400).json({ msg: 'Please provide mobile number, new password, and confirm password' });
        }
    
        if (newPassword !== confirmPassword) {
          return res.status(400).json({ msg: 'New password and confirm password do not match' });
        }
    
        // Hash the new password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);
    
          // Update the user's password in your database (Assuming the table name is "user")
          db.query('UPDATE user SET password = ? WHERE mobile_number = ?', [passwordHash, mobileNumber], (updateError, _results) => {
            if (updateError) {
              console.log(updateError);
              return res.status(500).json({ msg: 'Internal server error' });
            }
    
            // Password update was successful
            return res.status(200).json({ msg: 'Password updated successfully' });
          });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }