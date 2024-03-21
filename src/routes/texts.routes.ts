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

textRoute.use(isAuth);
textRoute.post("/", createText);
textRoute.get("/:type", getText);
textRoute.put("/:textID", updateText);
textRoute.delete("/:textID", deleteText);

export default textRoute;
