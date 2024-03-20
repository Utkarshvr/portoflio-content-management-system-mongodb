import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: String,
    media: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("media", Schema);

export default Media;
