import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  questions: {
    type: [mongoose.Types.ObjectId],
    ref: "Question",
  },
  answers: {
    type: [mongoose.Types.ObjectId],
    ref: "Answer",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
