import exppress from "express";
import {
  registerUserCtrl,
  loginUserCtrl,
  getUserProfileCtrl,
  updateShippingAddresctrl,
  forgotPasswordCtrl,
  changePasswordCtrl,
  getAllUsersCtrl,
  updateUserCtrl,
  uploadImageCtrl,

} from "../controllers/usersCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";

const userRoutes = exppress.Router();

userRoutes.post("/register", registerUserCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile", isLoggedIn, getUserProfileCtrl);
userRoutes.put("/update/shipping", isLoggedIn, updateShippingAddresctrl);
userRoutes.post("/forgotpassword", forgotPasswordCtrl);
userRoutes.post("/changepassword", isLoggedIn, changePasswordCtrl);
userRoutes.get("/", getAllUsersCtrl);
userRoutes.put("/update", isLoggedIn, upload.single("image"), updateUserCtrl);
userRoutes.post("/image", isLoggedIn, upload.single("image"), uploadImageCtrl);


export default userRoutes;
