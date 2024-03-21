import Projects from "@/models/Projects";
import { Request, Response } from "express";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, tools, source, visit, type, icon, images } =
      req.body;

    try {
      const newProject = await Projects.create({
        title,
        description: description || "",
        tools: tools || [],
        source,
        visit,
        type,

        icon: icon,

        images: images,
      });
      console.log("Created new project");
      return res.status(201).json({ project: newProject });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "An error occured while creating project" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getAllActiveProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Projects.find({
      isActive: true,
    })
      .populate(["icon", "images", "tools"])
      .lean();
    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Projects.find()
      .populate(["icon", "images", "tools"])
      .lean();

    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const toggleProjectStatus = async (req: Request, res: Response) => {
  const { projectID }: { projectID?: string | null } = req.params;

  try {
    const proj = await Projects.findById(projectID);
    proj.isActive = !proj.isActive;
    await proj.save();
    return res.status(200).json({ project: proj });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { projectID }: { projectID?: string | null } = req.params;

  try {
    await Projects.findByIdAndDelete(projectID);
    return res.status(200).json({ msg: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
