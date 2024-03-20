import Projects from "@/models/Projects";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";

export const createProject = async (req: Request, res: Response) => {
  try {
    const files = req.files as any;

    const iconPath = files?.icon ? files?.icon[0]?.path : null;

    const imagesPaths = files?.images
      ? files?.images?.map((img: any) => img?.path)
      : [];

    if (imagesPaths?.length > 5)
      return res
        .status(400)
        .json({ msg: "Max 5 Images are allowed at the time of creating" });

    // Upload All Images
    const uploadedImages: UploadApiResponse[] = await Promise.all(
      imagesPaths
        ?.map(async (img: any) => {
          try {
            const uploadedImg: UploadApiResponse = img
              ? await uploadOnCloudinary(img)
              : null;
            return uploadedImg;
          } catch (error) {
            console.log(error);
            return null;
          }
        })
        ?.filter((e: any) => !!e)
    );

    const uploadedIcon: UploadApiResponse = iconPath
      ? await uploadOnCloudinary(iconPath)
      : null;

    console.log({ uploadedImages, uploadedIcon });

    const { title, description, tools, source, visit, type } = req.body;

    try {
      const newProject = await Projects.create({
        title,
        description,
        tools,
        source,
        visit,
        type,

        icon: uploadedIcon?.secure_url || "",

        images: uploadedImages
          ?.map((img) => img?.secure_url)
          ?.filter((e) => !!e),
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

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Projects.find().lean();
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
