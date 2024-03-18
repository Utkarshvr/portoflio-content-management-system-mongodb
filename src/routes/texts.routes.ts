import {
  createText,
  getAllTexts,
  getText,
  updateText,
} from "@/controllers/texts.controller";
import { Router } from "express";

const textRoute = Router();

textRoute.get("/", getAllTexts);
textRoute.post("/", createText);

textRoute.get("/:type", getText);
textRoute.put("/:textID", updateText);

export default textRoute;
