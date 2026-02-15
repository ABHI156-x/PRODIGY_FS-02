import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import connectTOdb from "./db/db.js";
import departmentRouter from "./routes/departmentroutes.js";
import employeeRouter from "./routes/employee.js";
import settingrouter from "./routes/setting.js";
import dashboardRouter from './routes/dashboard.js'

connectTOdb();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));

app.use("/api/auth", authRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/setting", settingrouter)
app.use('/api/dashboard', dashboardRouter)

app.listen(process.env.PORT, () => {
  console.log("server is running ");
});