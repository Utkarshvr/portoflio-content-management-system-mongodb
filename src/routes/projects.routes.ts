import { Router } from "express";
import upload from "@/middlewares/multer.middlewares";
import {
  createProject,
  deleteProject,
  getAllProjects,
  toggleProjectStatus,
} from "@/controllers/projects.controller";

const projectRoute = Router();

projectRoute.get("/", getAllProjects);
// Upload single image
projectRoute.post("/", createProject);
projectRoute.put("/toggle-status/:projectID", toggleProjectStatus);
projectRoute.delete("/:projectID", deleteProject);

export default projectRoute;
