import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllActiveProjects,
  getAllProjects,
  toggleProjectStatus,
} from "@/controllers/projects.controller";
import isAuth from "@/middlewares/auth/isAuth";

const projectRoute = Router();

projectRoute.get("/", getAllActiveProjects);

projectRoute.use(isAuth);
projectRoute.get("/all", getAllProjects);
// Upload single image
projectRoute.post("/", createProject);
projectRoute.put("/toggle-status/:projectID", toggleProjectStatus);
projectRoute.delete("/:projectID", deleteProject);

export default projectRoute;
