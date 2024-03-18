import Texts from "@/models/Texts";
import { Request, Response } from "express";

export const getAllTexts = async (req: Request, res: Response) => {
  try {
    const texts = await Texts.find().lean();
    return res.status(200).json({ texts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getText = async (req: Request, res: Response) => {
  const { type }: { type?: string | null } = req.params;

  try {
    const text = await Texts.findOne({ type }).lean();
    if (!text) return res.status(404).json({ msg: `${type} Text not found` });
    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createText = async (req: Request, res: Response) => {
  const { type, text }: { type?: string | null; text?: string | null } =
    req.body;

  try {
    const newText = await Texts.create({ type, text });
    return res.status(201).json({ text: newText });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateText = async (req: Request, res: Response) => {
  const { type, text }: { type?: string | null; text?: string | null } =
    req.body;

  const { textID }: { textID?: string | null } = req.params;

  try {
    const updatedText = await Texts.findByIdAndUpdate(
      textID,
      {
        $set: {
          type,
          text,
        },
      },
      { new: true }
    );
    return res.status(200).json({ text: updatedText });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
