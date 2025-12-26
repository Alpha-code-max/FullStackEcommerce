import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

// Extend express-session type definitions
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      name: string | null;
      email: string;
      role: string;
    };
  }
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

  console.log('=== AUTH MIDDLEWARE DEBUG ===');
  console.log('req.session exists:', !!req.session);
  console.log('req.session:', req.session);
  console.log('req.session.user:', req.session.user);
  console.log('sessionID:', req.sessionID);
  console.log('================================');
  if (!req.session) {
    return res.status(401).json({ message: 'Session not initialized' });
  }

  if (req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

export default isAuthenticated;
