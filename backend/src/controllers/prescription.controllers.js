import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Prescription } from "../models/rXverification.models.js";

const prescriptionP = asyncHandler(async(req,res) => {
    const patientId = req.params.id;

    // bifocal
    const {sphericalLB,cylindricalLB,axisLB,pupilDistanceLB,addPowerLB} = req.body;
    const {sphericalRB,cylindricalRB,axisRB,pupilDistanceRB,addPowerRB} = req.body;

    // nearVision
    const {sphericalLN,cylindricalLN,axisLN,pupilDistanceLN,addPowerLN} = req.body;
    const {sphericalRN,cylindricalRN,axisRN,pupilDistanceRN,addPowerRN} = req.body;

    //farVision
    const {sphericalLF,cylindricalLF,axisLF,pupilDistanceLF,addPowerLF} = req.body;
    const {sphericalRF,cylindricalRF,axisRF,pupilDistanceRF,addPowerRF} = req.body;
    await Prescription.findOneAndUpdate(
        {
            patient:patientId
        },
        {
            $set:{
                bifocal:[
                    {
                        leftEye:{
                            spherical:sphericalLB,
                            cylindrical:cylindricalLB,
                            axis:axisLB,
                            pupilDistance:pupilDistanceLB,
                            addPower:addPowerLB
                        },
                        rightEye:{
                            spherical:sphericalRB,
                            cylindrical:cylindricalRB,
                            axis:axisRB,
                            pupilDistance:pupilDistanceRB,
                            addPower:addPowerRB
                        }
                    }
                ],
                nearVisionPower:[
                    {
                        leftEye:{
                            spherical:sphericalLN,
                            cylindrical:cylindricalLN,
                            axis:axisLN,
                            pupilDistance:pupilDistanceLN,
                            addPower:addPowerLN
                        },
                        rightEye:{
                            spherical:sphericalRN,
                            cylindrical:cylindricalRN,
                            axis:axisRN,
                            pupilDistance:pupilDistanceRN,
                            addPower:addPowerRN
                        }
                    }
                ],
                farVisionPower:[
                    {
                        leftEye:{
                            spherical:sphericalLF,
                            cylindrical:cylindricalLF,
                            axis:axisLF,
                            pupilDistance:pupilDistanceLF,
                            addPower:addPowerLF
                        },
                        rightEye:{
                            spherical:sphericalRF,
                            cylindrical:cylindricalRF,
                            axis:axisRF,
                            pupilDistance:pupilDistanceRF,
                            addPower:addPowerRF
                        }
                    }
                ]
            }
        }
    )
    // for as of now , using only 1 api call for cost cutting , later will add 3 as per requirments and pricing

    return res
    .status(200)
    .json(
        new ApiResponse(
             200,
             {},
             "precription updated successfully"
        )
    )
}) 

export {prescriptionP}