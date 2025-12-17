import mongoose, { Schema } from "mongoose";

const historyCheck = new mongoose.Schema({
    age: {
      type: Number,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const visionCheckSecond = new mongoose.Schema(
  {
    distanceVision: {
      type: Boolean,
      default: false,
    },
    nearVision: {
      type: Boolean,
      default: false,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const torchlight = new mongoose.Schema(
  {
    normality: {
      type: Boolean,
      default: false, // flase -> not normal , true -> normal
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const coverUncover = new mongoose.Schema({
  normality: {
    type: Boolean,
    default: false,
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
});

const convergence = new mongoose.Schema(
  {
    normality: {
      type: Boolean,
      default: false,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const purposeSchema = new mongoose.Schema({
  value: {
      type: String,
      required: true,
    },
},{timestamps:true})

const repeateSchema = new mongoose.Schema({
  purpose:{
    type:purposeSchema,
    required:true
  },
  stepFirst: {
    type: [historyCheck],
    default: () => [
      {
        age:0,
        isSubmitted: false,
      },
    ],
  },
  stepSecond: {
    type: [visionCheckSecond],
    default: () => [
      {
        distanceVision: false,
        nearVision: false,
        isSubmitted: false,
      },
    ],
  },
  stepThird: {
    type: [torchlight],
    default: () => [
      {
        normality: false,
        isSubmitted: false,
      },
    ],
  },
  stepFourth: {
    type: [coverUncover],
    default: () => [
      {
        normality: false,
        isSubmitted: false,
      },
    ],
  },
  stepFive: {
    type: [convergence],
    default: () => [
      {
        normality: false,
        isSubmitted: false,
      },
    ],
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
},{timestamps:true})


const stepSchema = new mongoose.Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  visits:{
    type:[repeateSchema],
    default:() => [{}],
  }
});

export const Step = mongoose.model("Step", stepSchema);


// for now experimental purpose , keeping the purpose same and fixed , will add conclusion of treatment at the end , 