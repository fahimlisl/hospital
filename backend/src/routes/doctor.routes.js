import {Router} from "express"
import { addVisit, fetchAllPatient, fetchAllVisit, finalSubmit, firstStepEdit, loginDoctor, logOutDoctor, registerDoctor, secondStepEdit, stepFiveEdit, stepFourthEdit, stepThirdEdit } from "../controllers/doctor.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"


const router = Router()

router.route("/login").post(loginDoctor)
router.route("/logout").post(verifyJWT,logOutDoctor)

// patient 
router.route("/addVisit/:id").post(verifyJWT,addVisit)
router.route("/fetchAllPatient").post(verifyJWT,fetchAllPatient)
router.route("/fetchPatient/:id").post(verifyJWT,fetchAllVisit)


// patient edit route
router.route("/check/:id").patch(verifyJWT,firstStepEdit)
router.route("/secondStep/:id").patch(verifyJWT,secondStepEdit)
router.route("/thirdStep/:id").patch(verifyJWT,stepThirdEdit)
router.route("/foruthStep/:id").patch(verifyJWT,stepFourthEdit)
router.route("/fifthStep/:id").patch(verifyJWT,stepFiveEdit)
router.route("/finalSubmit/:id").patch(verifyJWT,finalSubmit)

export default router