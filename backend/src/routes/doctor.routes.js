import {Router} from "express"
import { loginDoctor, registerDoctor } from "../controllers/doctor.controllers.js"


const router = Router()

// for just testing keeping the router to create docotr in this file , after test , have to move this route to admin router with proper validation

router.route("/register").post(registerDoctor)
router.route("/login").post(loginDoctor)

export default router