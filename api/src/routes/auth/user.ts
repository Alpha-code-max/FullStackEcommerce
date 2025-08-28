import { Router, Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import { UserInputSchema, UserInputType, UserLoginSchema, UserLoginType } from '../../schema/user.schema';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';


const prisma = new PrismaClient();
const userRouter = Router();

// ----------------------
// Login (GET by query)
// ----------------------
userRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password }: UserLoginType = UserLoginSchema.parse(req.body);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Store user in the session
    req.session.user = {
      id: Number(user.id),
      email: user.email,
      role: user.role,
    };

    console.log("Session set:", req.session.user);

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});


// ----------------------
// Register (POST)
// ----------------------
userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const userData: UserInputType = UserInputSchema.parse(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;


    const user = await prisma.user.create({
      data: userData,
    });

    res.json({ message: "User created", user });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

userRouter.post('/logout', async(req: Request, res: Response) => {
  req.session.destroy((err) => {
    if(err) return res.status(500).json({error: "Logout failed"});
    
    return res.json({message: "Logged Out"})

  })
})

export default userRouter;
