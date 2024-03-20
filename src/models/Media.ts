import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    media: {
      type: Object,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("media", Schema);

export default Media;
