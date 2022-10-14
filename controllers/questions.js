import { validationResult } from "express-validator";

import Question from "../models/Question.js";
import User from "../models/User.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ data: questions });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const getQuestionByTitle = async (req, res) => {
  const title = req.params.title.toLowerCase();
  try {
    const question = await Question.findOne({ title });
    res.status(200).json({ data: question });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const postQuestion = async (req, res) => {
  const question = req.body;
  const title = req.body.title.toLowerCase();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const existingTitle = await Question.findOne({ title });

  if (existingTitle) {
    return res.status(500).json({
      message: `Question with title '${title}' has been already asked`,
    });
  }

  const newQuestion = new Question({
    ...question,
    title: req.body.title.toLowerCase(),
    postedBy: req.userId,
  });

  try {
    await newQuestion.save();

    const user = await User.findById(req.userId);
    user.questions.push(newQuestion._id);
    await user.save();

    res.status(201).json(newQuestion);
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: err.message });
  }
};
