import { Router } from "express";
import upload from "@/middlewares/multer.middlewares";
import { uploadMyPic } from "@/controllers/upload.controller";

const uploadRoute = Router();

// Upload single image
uploadRoute.post(
  "/my-pic",
  upload.fields([{ name: "mypic", maxCount: 1 }]),
  uploadMyPic
);

export default uploadRoute;
