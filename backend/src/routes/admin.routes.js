import { Router } from "express";
import { adminRegister, loginAdmin, logoutAdmin } from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { registerDoctor, removeDoctor } from "../controllers/doctor.controllers.js";

const router = Router();

router.route("/register").post(adminRegister);
router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyJWT,logoutAdmin)

// docotor
router.route("/registerDoc").post(verifyJWT,registerDoctor)
router.route("/removeDoc/:id").delete(verifyJWT,removeDoctor)

export default router;
