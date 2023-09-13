const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Model = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "HELLO";
const fetchuser = require("../middleware/fetchuser");
const User = Model.User;
const { body, validationResult } = require("express-validator");

const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: "dhruv1.prajapati2018@gmail.com",
    pass: "uhizfitxwcmovwhq",
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Store OTPs and their expiration times (in-memory for simplicity)
const otpStore = {};

// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // e.g., 'Gmail', 'Outlook', etc.
//   port:465,
//   secure:true,
//   logger:true,
//   debug:true,
//   secureConnection:false,
//   auth: {
//     user: 'dhruv1.praj@gmail.com',
//     pass: '7359144577',
//   },
//   tls:{
//     rejectUnAuthorized:true,
//   }
// });

//##########################################################################################

router.post(
  "/createuser",
  [
    body("name", "Enter A Valid Name").isLength({ min: 3 }),
    body("email", "Enter A Valid Email").isEmail(),
    body("password", "Enter A Valid Password").isLength({ min: 3 }),
    body("number", "Enter A Valid Number").isLength({ min: 10, max: 10 }),
  ],
  async (req, res) => {
    console.log(req.body);

    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success: false, result: result.array() });
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "this email is alredy exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        number: req.body.number,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const jwtdata = jwt.sign(data, JWT_SECRET);
      let success = true;
      console.log(success, jwtdata);
      res.status(200).json({ success: true, jwtdata });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }
);

//##########################################################################################

router.post(
  "/login",
  [
    body("email", "Enter A Valid Email").isEmail(),
    body("password", "Password Can not be blank").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Incorrect Mail" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        let success = false;
        return res.status(400).json({ success, error: "Incorrect Password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      // console.log(user);
      const token = jwt.sign(data, JWT_SECRET);
      let success = true;
      const name = user.name;
      res.json({ success, token, name });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }
);

//##########################################################################################

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.json({ user });
  } catch (error) {
    console.error("Error saving data:", error);
  }
});

//##########################################################################################

//change email through user id  not user password:-----------------------------

// router.post('/changeemail', [
//   body('userId', 'Enter a valid user ID').isMongoId(),
//   body('newEmail', 'Enter a valid email').isEmail(),
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { userId, newEmail } = req.body;
//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const emailExists = await User.findOne({ email: newEmail });
//     if (emailExists) {
//       return res.status(400).json({ error: 'This email is already taken' });
//     }

//     user.email = newEmail;
//     await user.save();

//     return res.json({ message: 'Email updated successfully' });
//   } catch (error) {
//     console.error('Error updating email:', error);
//     return res.status(500).json({ error: 'An error occurred while updating email' });
//   }
// });

//##########################################################################################

//change email through password  not user id:-----------------------------

router.post(
  "/changeemail",
  [
    body("currentemail", "Enter a valid user email").isEmail(),
    body(
      "password",
      "Enter a valid password with a minimum length of 3 characters"
    ).isLength({ min: 3 }),
    body("newEmail", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentemail, password, newEmail } = req.body;
      let user = await User.findOne({ email: currentemail });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(400).json({ error: "This email is already taken" });
      }

      user.email = newEmail;
      await user.save();
      let success = true;
      return res.json({ success, message: "Email updated successfully" });
    } catch (error) {
      console.error("Error updating email:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating email" });
    }
  }
);

//##########################################################################################

//change password through user id:-----------------------------

// router.post('/changepassword', [
//   body('userId', 'Enter a valid user ID').isMongoId(),
//   body('currentPassword', 'Enter your current password').notEmpty(),
//   body('newPassword', 'Enter a valid password with a minimum length of 3 characters').isLength({ min: 3 }),
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { userId, currentPassword, newPassword } = req.body;

//     let user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({ error: 'Invalid current password' });
//     }

//     const saltRounds = 10;
//     const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
//     user.password = hashedNewPassword;
//     await user.save();

//     return res.json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error('Error updating password:', error);
//     return res.status(500).json({ error: 'An error occurred while updating the password' });
//   }
// });

//##########################################################################################

//change password through email id not user id:-----------------------------

router.post(
  "/changepassword",
  [
    body("email", "Enter a valid user ID").isEmail(),
    body("currentPassword", "Enter your current password").notEmpty(),
    body(
      "newPassword",
      "Enter a valid password with a minimum length of 3 characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, currentPassword, newPassword } = req.body;

      // Check if the user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the current password matches the one in the database
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Invalid current password" });
      }

      // Hash the new password and update it in the database
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedNewPassword;
      await user.save();
      let success = true;
      return res.json({ success, message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the password" });
    }
  }
);

//##########################################################################################

// "Forgot Password" API
router.post(
  "/forgotpassword",
  [body("email", "Enter a valid user ID").isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      // Check if the user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Generate and store OTP
      const otp = generateOTP();
      otpStore[email] = {
        otp: otp.toString(),
        expiresAt: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
      };

      // Compose email
      const mailOptions = {
        from: "dhruv1.prajapati2018@gmail.com",
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is: ${otp}`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while sending OTP" });
    }
  }
);

//##########################################################################################

router.post(
  "/verify",
  [
    body("email", "Enter a valid user ID").isEmail(),
    body("otp", "Enter a valid OTP").isLength({ min: 6, max: 6 }),
    body(
      "newPassword",
      "Enter a valid password with a minimum length of 3 characters"
    ).isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, otp, newPassword } = req.body;

      // Check if the user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify OTP
      const storedOtp = otpStore[email];
      if (
        !storedOtp ||
        storedOtp.otp !== otp ||
        storedOtp.expiresAt < Date.now()
      ) {
        return res.status(401).json({ error: "Invalid OTP" });
      }

      // Hash the new password and update it
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedNewPassword;
      await user.save();

      return res.json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the password" });
    }
  }
);

module.exports = router;
