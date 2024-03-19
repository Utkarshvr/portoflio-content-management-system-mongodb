import Links from "@/models/Links";
import { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    const links = await Links.find().lean();
    return res.status(200).json({ links });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const get = async (req: Request, res: Response) => {
  const { type }: { type?: string | null } = req.params;

  try {
    const link = await Links.findOne({ type }).lean();
    if (!link) return res.status(404).json({ msg: `${type} Link not found` });
    return res.status(200).json({ link });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const create = async (req: Request, res: Response) => {
  const { type, link }: { type?: string | null; link?: string | null } =
    req.body;

  try {
    const newText = await Links.create({ type, link });
    return res.status(201).json({ link: newText });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const update = async (req: Request, res: Response) => {
  const { type, link }: { type?: string | null; link?: string | null } =
    req.body;

  const { linkID }: { linkID?: string | null } = req.params;

  try {
    const updatedText = await Links.findByIdAndUpdate(
      linkID,
      {
        $set: {
          type,
          link,
        },
      },
      { new: true }
    );
    return res.status(200).json({ link: updatedText });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  const { linkID }: { linkID?: string | null } = req.params;

  try {
    await Links.findByIdAndDelete(linkID).lean();
    return res.status(200).json({ msg: "Link is deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
