import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { Patient } from "../models/patient.models.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { Step } from "../models/step.models.js";


const addPatient = asyncHandler(async(req,res) => {
    const {fullName,phoneNumber,email,DOB} = req.body;
    if(!fullName && !DOB ){
        throw new ApiError(400,"these fields must required")
    }

    const check = await Patient.findOne({phoneNumber}) // will be using findOne as of now , gotta ask the authority wheather they wants to allow , mutiple user in same phoneNumber

    if (check) {
        throw new ApiError(400,"Patient already exists")
    }
    const createUser = await Patient.create({
        email : email || "",
        fullName,
        phoneNumber,
        DOB
    })


    if(!createUser){
        throw new ApiError(401,"wasn't able to create Patitnet")
    }

    const setpP = await Step.create({
        patient:createUser._id,
    })

    await Patient.findByIdAndUpdate(createUser._id,
        {
            $set:{
                steps:setpP._id
            }
        }
    )

    const finalUser = await Patient.findById(createUser._id).populate("steps")

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            finalUser,
            "Patient created Successfully"
        )
    )

})


export {addPatient}