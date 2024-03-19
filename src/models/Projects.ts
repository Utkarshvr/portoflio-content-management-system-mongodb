import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    icon: String,

    title: String,
    description: String,

    images: [String],

    source: String,
    visit: String,

    type: {
      type: String,
      enum: ["application", "website"],
      required: true,
    },

    tools: {
      type: [String],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Projects = mongoose.model("projects", Schema);

export default Projects;
