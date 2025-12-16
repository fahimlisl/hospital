import mongoose, { Schema } from "mongoose";

const stepOne = new mongoose.Schema({
    powerOne:{
        type:Number,
        default:0
    },
    powerTwo:{
        type:Number,
        default:0
    },
    isSubmitted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const stepTwo = new mongoose.Schema({
    powerThree:{
        type:Number
    },
    powerFour:{
        type:Number
    },
    isSubmitted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const stepSchema = new mongoose.Schema({
  stepFirst: {
    type: [stepOne],
    default: () => [{
      powerOne: 0,
      powerTwo: 0,
      isSubmitted: false
    }]
  },
  stepSecond: {
    type:[stepTwo],
    default: () => [{
        powerFour:0,
        powerThree:0,
        isSubmitted:false
    }]
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient"
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

export const Step = mongoose.model("Step",stepSchema)