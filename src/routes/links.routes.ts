import { Router } from "express";
import {
  create,
  deleteLink,
  get,
  getAll,
  update,
} from "@/controllers/links.controller";
import isAuth from "@/middlewares/auth/isAuth";

const linkRoute = Router();

linkRoute.get("/", getAll);

linkRoute.use(isAuth);
linkRoute.post("/", create);
linkRoute.get("/:type", get);
linkRoute.put("/:linkID", update);
linkRoute.delete("/:linkID", deleteLink);

export default linkRoute;
