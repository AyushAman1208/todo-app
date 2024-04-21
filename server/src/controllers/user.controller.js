import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import validateEmail from "../utils/validateEmail.js";
import ApiResponse from "../utils/apiResponse.js"

export const newUserSignIn = asyncHandler(async (req,res) => {
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
   if(!validateEmail(email)){
       throw new ApiError(400,"Please check email and enter again");
    }
    const existingUserByUserName = await User.findOne({
        username
    })
    if(existingUserByUserName){
        throw new ApiError(403, "User with the entered username already exists");
    }
    const existingUserByEmail = await User.findOne({email});
    if(existingUserByEmail){
        throw new ApiError(403, "Email already registered");
    }
    if(password.length < 6){
        throw new ApiError(400, "Password should be atleast 6 characters");
    }
    console.log("controller")
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
   

   
