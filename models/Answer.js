import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    selectedImage: {
      type: String,
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
    answeredBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
