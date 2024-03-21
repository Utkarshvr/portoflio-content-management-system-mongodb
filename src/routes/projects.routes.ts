import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  toggleProjectStatus,
} from "@/controllers/projects.controller";
import isAuth from "@/middlewares/auth/isAuth";

const projectRoute = Router();

projectRoute.get("/", getAllProjects);

projectRoute.use(isAuth);
// Upload single image
projectRoute.post("/", createProject);
projectRoute.put("/toggle-status/:projectID", toggleProjectStatus);
projectRoute.delete("/:projectID", deleteProject);

export default projectRoute;
