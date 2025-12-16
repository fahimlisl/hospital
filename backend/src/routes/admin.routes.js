import { Router } from "express";
import { adminRegister, loginAdmin } from "../controllers/admin.controllers.js";

const router = Router();

router.route("/register").post(adminRegister);
router.route("/login").post(loginAdmin)

export default router;
