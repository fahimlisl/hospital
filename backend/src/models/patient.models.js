import mongoose, { Schema } from "mongoose";

const patientSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true // maybe have to change to flase , 
    },
    email:{
        type:String,
    },
    DOB:{
        // type:Date
        type:String
    },
    steps:{
        type: Schema.Types.ObjectId,
        ref:"Step"
    },
    age:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const Patient = mongoose.model("Patient",patientSchema)