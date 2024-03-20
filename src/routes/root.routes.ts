import { Router, json } from "express";
import textRoute from "./texts.routes";
import linkRoute from "./links.routes";
import mediaRoutes from "./media.routes";
import projectRoute from "./projects.routes";

const rootRoute = Router();

rootRoute.use(json());

rootRoute.get("/", (req, res) => {
  res.json("Welcome to the Portfolio API");
});

rootRoute.use("/media", mediaRoutes);

rootRoute.use("/projects", projectRoute);

rootRoute.use("/texts", textRoute);

rootRoute.use("/links", linkRoute);

export default rootRoute;
