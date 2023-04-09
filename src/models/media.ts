import mongoose, { Schema, Types } from "mongoose";
import { IMediaDocument } from "../types/media";

export const mediaSchema = new Schema({
  type: { type: String, required: true },
  path: { type: String, required: true },
});

const Media =
  mongoose.models.medias || mongoose.model<IMediaDocument>("medias", mediaSchema);

export default Media;
