import { Document } from "mongoose";

export type Media = {
  path: string;
  type: string;
};

export interface IMediaDocument extends Document, Media {}
