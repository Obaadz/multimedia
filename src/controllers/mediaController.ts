import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from "../types/enums";
import { compressVideo, findMedia, insertMedia } from "../services/media";
import { Media } from "../types/media";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

export default class MediaController {
  static async upload(req: Request, res: Response) {
    const video = req.file;
    try {
      if (!video) throw new Error(ERROR_MESSAGES.INCORRECT_MEDIA);

      await compressVideo(video.path, video.path + ".mp4");
      console.log(video.path + ".mp4");
      console.log("the above is video path");
      fs.unlinkSync(video.path);
      const vmedia = await insertMedia({
        type: video.mimetype,
        path: video.path + ".mp4",
      });
      console.log(vmedia._id);
      console.log("the above is vmedia id");
      res.status(200).send("OK");
    } catch (err: any) {
      res.status(404).send(ERROR_MESSAGES.INCORRECT_MEDIA);
    }
  }

  static async getMediaPaths(req: Request, res: Response) {
    try {
      const medias = await findMedia({});

      res.status(200).send({ medias });
    } catch (err) {
      res.status(404).send(ERROR_MESSAGES.INCORRECT_MEDIA + " getMediaPaths");
    }
  }

  static async getMedia(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const media = await findMedia({ _id: id });

      const video = fs.readFileSync(media.path);

      res.writeHead(200, { "Content-Type": media.type });
      res.end(video, "binary");
    } catch (err) {
      res.status(404).send(ERROR_MESSAGES.INCORRECT_MEDIA + " getMedia");
    }
  }
}
