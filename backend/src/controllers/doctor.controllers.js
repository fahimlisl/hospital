import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Doctor } from "../models/doctor.models.js";
import { options } from "../utils/options.js";
import generateAccessAndRefreshToken from "../utils/generateA&RT.js";


const registerDoctor = asyncHandler( async(req,res) => {
    const {phoneNumber,email,fullName,department,qualification,password} = req.body;

    if ([phoneNumber,email,fullName,department,qualification,password].some((t) => !t && t !== 0 )) {
        throw new ApiError(400,"All feilds are required")
    }

    const checkExistance = await Doctor.findOne({
        $or:[
            {email},{phoneNumber}
        ]
    })

    if (checkExistance) throw new ApiError(400,"Doctor already exits")


    const createdDoctor = await Doctor.create({
        email,
        phoneNumber,
        department,
        qualification,
        fullName,
        password
    })

    if(!createdDoctor) throw new ApiError(400,"fialed to create Docotr , chceck bakcend")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            createdDoctor,
            "doctor created Successfully"
        )
    )
    
})

const loginDoctor = asyncHandler( async(req,res) => {
    const {phoneNumber,email,password} = req.body;
    const foundUser = await Doctor.findOne({
        $or:[
            {email},{phoneNumber}
        ]
    })

    if (!foundUser) {
        throw new ApiError(400,"Doctor was not added")
    }

    const checkPassord = await foundUser.isPasswordCorrect(password)

    if(!checkPassord) throw new ApiError(401,"invalid crednetials , password incorrect")

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(foundUser._id,Doctor)

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            foundUser,
            "Doctor Login Successful"
        )
    )
})


export {loginDoctor,registerDoctor}