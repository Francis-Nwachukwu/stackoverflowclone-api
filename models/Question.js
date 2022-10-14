import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    selectedImage: {
      type: String,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    upVote: {
      type: [String],
      default: [],
    },
    downVote: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    answer: {
      type: [mongoose.Types.ObjectId],
      ref: "Answer",
      default: [],
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
