import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Private/Admin

export const registerUserCtrl = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  //Check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    //throw
    throw new Error("User already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //create the user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});
// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public

export const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      message: "User logged in successfully",
      userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.userAuthId).populate("orders");
  res.json({
    status: "success",
    message: "User profile fetched successfully",
    user,
  });
});

// @desc    Update user shipping address
// @route   PUT /api/v1/users/update/shipping
// @access  Private

export const updateShippingAddresctrl = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    postalCode,
    province,
    phone,
    country,
  } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
        country,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );
  //send response
  res.json({
    status: "success",
    message: "User shipping address updated successfully",
    user,
  });
});


//tiendung8a6@gmail.com
//matkhaumoka
//engmadev2021@gmail.com----edtdtqelvvmbione
//Forgot password================================================================================================================
import nodemailer from "nodemailer";

// Hàm gửi email
const sendEmail = async (to, subject, text) => {
  try {
    // Tạo một transporter sử dụng thông tin tài khoản email của bạn
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "engmadev2021@gmail.com",
        pass: "edtdtqelvvmbione",
      },
    });

    // Tạo một option email
    const mailOptions = {
      from: "engmadev2021@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

// @desc    Forgot password
// @route   POST /api/v1/users/forgotpassword
// @access  Public
export const forgotPasswordCtrl = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Tìm người dùng trong db bằng email
  const user = await User.findOne({ email });

  if (!user) {
    // Nếu người dùng không tồn tại, trả về lỗi
    throw new Error("User not found");
  }

  // Tạo một mật khẩu ngẫu nhiên
  const newPassword = Math.random().toString(36).slice(-8); // Mật khẩu gồm 8 ký tự ngẫu nhiên

  // Hash mật khẩu mới
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Lưu mật khẩu mới vào tài liệu người dùng
  user.password = hashedPassword;
  await user.save();

  // Gửi mật khẩu mới qua email
  const subject = "Cấp lại mật khẩu mới";
  const text = `Mật khẩu mới của bạn là: ${newPassword}`;


  try {
    await sendEmail(email, subject, text);
  } catch (error) {
    throw new Error("Failed to send email");
  }

  res.json({
    status: "success",
    message: "New password has been sent to your email",
  });
});






