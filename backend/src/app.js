import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.json({limit:"16kb"}))
app.use(express.static("public"))


// routes
import adminRotuer from "./routes/admin.routes.js"
import patientRouter from "./routes/patient.routes.js"
import doctorRotuer from "./routes/doctor.routes.js"
app.use("/api/v1/admin",adminRotuer)
app.use("/api/v1/patient",patientRouter)
app.use("/api/v1/doctor",doctorRotuer)

export {app}