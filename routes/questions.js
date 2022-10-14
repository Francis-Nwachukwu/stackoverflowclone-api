import express from "express";
import { body } from "express-validator";

import auth from "../middleware/auth.js";
import {
  getQuestionByTitle,
  getQuestions,
  postQuestion,
} from "../controllers/questions.js";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:title", getQuestionByTitle);
router.post(
  "/ask",
  [
    body("title")
      .isLength({ min: 10, max: 70 })
      .withMessage(
        "Invalid title. Must be at least 10 and at most 70 characters."
      )
      .trim(),
    body("body").trim(),
  ],
  auth,
  postQuestion
);

export default router;
