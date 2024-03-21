import { Router } from "express";
import upload from "@/middlewares/multer.middlewares";
import {
  deleteMedia,
  deleteMedias,
  editMedia,
  getAllMedia,
  getMediaByName,
  uploadSingleFile,
} from "@/controllers/media.controller";

const mediaRoutes = Router();

// Upload single image
mediaRoutes.get("/", getAllMedia);
mediaRoutes.get("/:name", getMediaByName);
mediaRoutes.post("/single", upload.single("media"), uploadSingleFile);
mediaRoutes.delete("/multiple", deleteMedias);
mediaRoutes.delete("/:mediaID", deleteMedia);
mediaRoutes.put("/:mediaID", editMedia);

export default mediaRoutes;
