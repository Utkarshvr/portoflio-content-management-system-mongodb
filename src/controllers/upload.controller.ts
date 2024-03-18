import Links from "@/models/Links";
import { uploadOnCloudinary } from "@/utils/cloudinary";
import { Request, Response } from "express";

export const uploadMyPic = async (req: Request, res: Response) => {
  const files = req.files as any;
  const picPath = files?.mypic ? files?.mypic[0]?.path : null;

  const uploadedPic = picPath ? await uploadOnCloudinary(picPath) : null;

  try {
    await Links.deleteOne({ type: "mypic" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
  try {
    const pic = await Links.create({
      type: "mypic",
      link: uploadedPic?.secure_url || "",
    });
    console.log("Uploaded and saved the link to your picture");
    return res
      .status(201)
      .json({ msg: "Uploaded and saved the link to your picture", pic });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
