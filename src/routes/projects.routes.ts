import { Router } from "express";
import upload from "@/middlewares/multer.middlewares";
import {
  createProject,
  getAllProjects,
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

export default projectRoute;
