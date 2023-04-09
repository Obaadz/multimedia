import { Document } from "mongoose";

export type Media = {
  type: string;
  file: Buffer;
};

export interface IMediaDocument extends Document, Media {}
