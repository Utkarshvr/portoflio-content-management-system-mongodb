import { Router } from "express";
import { create, get, getAll, update } from "@/controllers/links.controller";

const linkRoute = Router();

linkRoute.get("/", getAll);
linkRoute.post("/", create);

linkRoute.get("/:type", get);
linkRoute.put("/:linkID", update);

export default linkRoute;
