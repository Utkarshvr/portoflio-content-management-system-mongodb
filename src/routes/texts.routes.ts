import {
  createText,
  deleteText,
  getAllTexts,
  getText,
  updateText,
} from "@/controllers/texts.controller";
import isAuth from "@/middlewares/auth/isAuth";
import { Router } from "express";

const textRoute = Router();

textRoute.get("/", getAllTexts);
textRoute.get("/:type", getText);

textRoute.use(isAuth);
textRoute.post("/", createText);
textRoute.put("/:textID", updateText);
textRoute.delete("/:textID", deleteText);

export default textRoute;
