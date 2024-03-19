import { Router } from "express";
import {
  create,
  deleteLink,
  get,
  getAll,
  update,
} from "@/controllers/links.controller";

const linkRoute = Router();

linkRoute.get("/", getAll);
linkRoute.post("/", create);

linkRoute.get("/:type", get);
linkRoute.put("/:linkID", update);
linkRoute.delete("/:linkID", deleteLink);

export default linkRoute;
