import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parent: { type: String, ref: "folders" }, // Reference to parent folder
  },
  { timestamps: true }
);

const Folders = mongoose.model("folders", Schema);

export default Folders;
