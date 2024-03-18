import mongoose from "mongoose";

const textSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Texts = mongoose.model("texts", textSchema);

export default Texts;
