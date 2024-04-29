import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import validateEmail from "../utils/validateEmail.js";
import ApiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log(user.email);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(401, "Error generating tokens");
  }
};

export const newUserSignIn = asyncHandler(async (req, res) => {
  /*
    ALGORITHM FOR SIGNINING IN A USER
    get user credentials(username, full name, email and password)
    validate email
    check if the user already exists(check using username and email)
    check if the password is atleast 6 characters
    create a new user
    create user object
    add it to the mongodb database.
    remove password and refresh token fields
    check for user creation
    return response 
    */
  const { username, email, fullname, password } = req.body;
  if (!validateEmail(email)) {
    throw new ApiError(400, "Please check email and enter again");
  }
  const existingUserByUserName = await User.findOne({
    username,
  });
  if (existingUserByUserName) {
    throw new ApiError(403, "User with the entered username already exists");
  }
  const existingUserByEmail = await User.findOne({ email });
  if (existingUserByEmail) {
    throw new ApiError(403, "Email already registered");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password should be atleast 6 characters");
  }
  console.log("controller");
  const user = await User.create({
    fullname,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }
  res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export const existingUserLogin = asyncHandler(async (req, res) => {
  /*
  take username or email and password
  check which is entered - username or password
  find user in the db
  if not found return an error message
  if found check password
  if pasword is wrong send an error
  generate refresh and access token 
  send them as cookies
  */

  const { username, email, password } = req.body;
  if (!(username || email)) {
    throw new ApiError(
      401,
      "Either email or username is required for logging in"
    );
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "Error finding user");
  }

  const isPasswordcorrect = await user.isPasswordcorrect(password);
  if (!isPasswordcorrect) {
    throw new ApiError(401, "Wrong password");
  }
  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
    user._id
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .send(new ApiResponse(200, "User logged in successfully"));
});

export const userLogOut = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user._id,
  {
    $set: refreshToken = undefined
  },
{
  new: true
});
const options = {
  httpOnly: true,
  secure: true
}

res.status(200).clearCookies("accessToken",options).
clearCookies("refreshToken",options).send(new ApiResponse(200, "User logged out"));

})
