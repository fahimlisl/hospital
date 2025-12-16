import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.models.js";
import { options } from "../utils/options.js";
import generateAccessAndRefreshToken from "../utils/generateA&RT.js";


const adminRegister = asyncHandler(async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  if ([username, email, password, phoneNumber].some((t) => !t && t !== 0)) {
    throw new ApiError(401, "all fields are required");
  }

  const checkUser = await Admin.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (checkUser) {
    throw new ApiError(400, "user already exits");
  }

  const createUser = await Admin.create({
    username,
    phoneNumber,
    email,
    password,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, createUser, "Admin created Successfully"));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  if (!email || !phoneNumber) {
    throw new ApiError(400, "at least one field is required");
  }

  const foundUser = await Admin.findOne({
    $or:[
      {email},{phoneNumber}
    ]
  })

  if(!foundUser) throw new ApiError(400,"User not found")
 
  if (!password) throw new ApiError(400, "password is required");

  const bcyrptedPassword = await foundUser.isPasswordCorrect(password);

  if (!bcyrptedPassword) throw new ApiError(400, "pasword didn't matched");


  const {accessToken,refreshToken} = await generateAccessAndRefreshToken(foundUser._id,Admin)

  return res
  .status(200)
  .cookie("accessToken" , accessToken , options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
      200,
      foundUser,
      "User loggedIN successfully"
    )
  )
});

export { adminRegister, loginAdmin };

// max to max limit per day 2 to 3 eyetests
