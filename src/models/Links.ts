import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Links = mongoose.model("links", Schema);

export default Links;
