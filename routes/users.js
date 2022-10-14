import express from "express";
import { body } from "express-validator";

import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post(
  "/signup",
  [
    body("firstName")
      .isAlpha()
      .withMessage("Please enter a valid name.")
      .trim(),
    body("lastName").isAlpha().withMessage("Please enter a valid name.").trim(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password MUST be at least 8 characters long.")
      .matches(/\d/)
      .withMessage("must contain a number")
      .trim(),
  ],
  signup
);

export default router;
