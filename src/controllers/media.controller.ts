import Media from "@/models/Media";
import {
  deleteMediaFromCloudinary,
  uploadOnCloudinary,
} from "@/utils/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Request, Response } from "express";

export const uploadSingleFile = async (req: Request, res: Response) => {
  const media = req.file;
  const { name } = req.body;

  // console.log({ name, media: media?.path });

  if (!media) return res.status(400).json({ msg: "Media File is not present" });
  try {
    const uploadedMedia: UploadApiResponse = await uploadOnCloudinary(
      media.path,
      name
    );
    // console.log({ uploadedMedia });

    if (uploadedMedia) {
      try {
        const newMedia = await Media.create({
          name: name || uploadedMedia.public_id,
          media: uploadedMedia,
        });
        return res.status(201).json({
          msg: "Media File Uploaded",
          media: newMedia,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ msg: "Couldn't save the uploaded file in Media Collection" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getAllMedia = async (req: Request, res: Response) => {
  try {
    // Fetch all media from the database
    const allMedia = await Media.find().sort({ createdAt: -1 });

    // Send the response with the fetched media
    res.status(200).json({ media: allMedia });
  } catch (error) {
    // Handle errors
    console.error("Error fetching all media:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMediaByName = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    // Fetch all media from the database
    const media = await Media.findOne({ name });

    // Send the response with the fetched media
    res.status(200).json({ media });
  } catch (error) {
    // Handle errors
    console.error("Error fetching all media:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const editMedia = async (req: Request, res: Response) => {
  const { mediaID } = req.params;
  const { name } = req.body;

  if (!name)
    return res.status(400).json({ msg: "Media name must be provided" });

  try {
    // Fetch all media from the database
    const media = await Media.findById(mediaID);
    media.name = name;
    await media.save();

    return res.status(200).json({ msg: "Media file updated" });
  } catch (error) {
    // Handle errors
    console.error("Error fetching all media:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  const { mediaID } = req.params;

  try {
    // Fetch all media from the database
    const media = await Media.findById(mediaID);
    try {
      await deleteMediaFromCloudinary([media.media.public_id]);

      try {
        await media.deleteOne();
        res.status(200).json({ msg: "Removed the media" });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error while deleting media from the DB",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while deleting media from cloudinary",
      });
      console.log("Error while deleting media from cloudinary: ", error);
    }
  } catch (error) {
    // Handle errors
    console.error("Error fetching all media:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteMedias = async (req: Request, res: Response) => {
  const { mediaIDs } = req.body;

  try {
    // Fetch all media from the database
    const medias = await Media.find({ _id: { $in: mediaIDs } });
    try {
      const cloudinaryPublicIds = medias.map((media) => media.media.public_id);

      await deleteMediaFromCloudinary(cloudinaryPublicIds);

      try {
        await Media.deleteMany({ _id: { $in: mediaIDs } });
        res.status(200).json({ msg: "Removed the media" });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error while deleting media from the DB",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while deleting media from cloudinary",
      });
      console.log("Error while deleting media from cloudinary: ", error);
    }
  } catch (error) {
    // Handle errors
    console.error("Error fetching all media:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
