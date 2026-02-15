import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/user.js";
import connectTOdb from "./db/db.js";

dotenv.config();

// 🔹 CONNECT TO DATABASE FIRST
await connectTOdb();

const UserRegister = async () => {
  try {
    const hashPassword = await bcrypt.hash("admin", 10);

    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("Admin user created successfully");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

UserRegister();
