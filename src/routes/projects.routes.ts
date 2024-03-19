import { Router } from "express";
import upload from "@/middlewares/multer.middlewares";
import {
  createProject,
  getAllProjects,
  toggleProjectStatus,
} from "@/controllers/projects.controller";

const projectRoute = Router();

projectRoute.get("/", getAllProjects);
// Upload single image
projectRoute.post(
  "/",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createProject
);
projectRoute.put("/toggle-status/:projectID", toggleProjectStatus);

export default projectRoute;
