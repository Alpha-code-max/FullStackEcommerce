import * as express from "express";
import "express-session"

declare global {
  namespace Express {
    interface Request {
      userId?: string; // 👈 add your custom field
    }
  }
}
