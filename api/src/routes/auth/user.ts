import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserInputSchema, UserInputType, UserLoginSchema, UserLoginType } from '../../schema/user.schema.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const userRouter = Router();

// ----------------------
// REGISTER (POST)
// ----------------------
userRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const userData: UserInputType = UserInputSchema.parse(req.body);

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    // Auto-login: set session
    req.session.user = {
      id: user.id,
      name: user.name || null,
      email: user.email,
      role: user.role || 'user',
    };

    // Remove password from response
    const { password: _, ...safeUser } = user;

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { user: safeUser },
    });
  } catch (error: any) {
    console.error('Registration error:', error);

    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Email already in use',
      });
    }

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error creating user',
    });
  }
});

// ----------------------
// LOGIN (POST)
// ----------------------
userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: UserLoginType = UserLoginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Set session (auto-login)
    req.session.user = {
      id: user.id,
      name: user.name || null,
      email: user.email,
      role: user.role || 'user',
    };

    // Remove password
    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user: safeUser },
    });
  } catch (error: any) {
    console.error('Login error:', error);

    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error during login',
    });
  }
});

// ----------------------
// GET CURRENT USER (/me)
// ----------------------
userRouter.get('/me', async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
    });
  }

  return res.json({
    success: true,
    data: { user: req.session.user },
  });
});

// ----------------------
// LOGOUT (POST)
// ----------------------
userRouter.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({
        success: false,
        message: 'Logout failed',
      });
    }

    // Optional: clear cookie
    res.clearCookie('connect.sid'); // default session cookie name

    return res.json({
      success: true,
      message: 'Logged out successfully',
    });
  });
});

export default userRouter;