import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from "../types/enums";
import { findMedia, insertMedia } from "../services/media";
import { Media } from "../types/media";
import fs from "fs";

export default class MediaController {
  static async upload(req: Request, res: Response) {
    const video = req.file;
    try {
      if (!video) throw new Error(ERROR_MESSAGES.INCORRECT_MEDIA);
      console.log(video.path);

      const tmedia = fs.readFileSync(video.path);
      console.log(tmedia);
      res.status(200).send("OK");
    } catch (err: any) {
      res.status(404).send(ERROR_MESSAGES.INCORRECT_MEDIA);
    }
  }
}
