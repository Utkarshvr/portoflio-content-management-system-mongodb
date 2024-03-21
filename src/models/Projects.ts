import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    icon: { type: mongoose.Schema.Types.ObjectId, ref: "media" },
    images: { type: [mongoose.Schema.Types.ObjectId], ref: "media" },

    source: String,
    visit: String,

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
