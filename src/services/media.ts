import { ERROR_MESSAGES } from "../types/enums";
import type { IMediaDocument, Media } from "../types/media";
import MediaModel from "../models/media";
import { FilterQuery, UpdateQuery } from "mongoose";
import ffmpeg from "fluent-ffmpeg";

export async function findMedia(
  query: FilterQuery<IMediaDocument>,
  selectedItems?: string | string[]
) {
  const dbMedia: IMediaDocument | null = await MediaModel.findOne(query).select(
    selectedItems ? selectedItems : undefined
  );

  if (!dbMedia) throw new Error(ERROR_MESSAGES.INCORRECT_MEDIA);

  return dbMedia;
}

export async function findMedias(
  query: FilterQuery<IMediaDocument>,
  selectedItems?: string | string[]
) {
  const dbMedias: IMediaDocument[] | null = await MediaModel.find(query).select(
    selectedItems ? selectedItems : undefined
  );

  if (!dbMedias) throw new Error(ERROR_MESSAGES.INCORRECT_MEDIA);

  return dbMedias;
}

export async function insertMedia(media: Media) {
  const dbMedia: IMediaDocument = new MediaModel<Media>({
    ...media,
  });

  await dbMedia.save();

  return findMedia({ _id: dbMedia._id });
}

export async function updateMedia(
  query: FilterQuery<IMediaDocument>,
  update: UpdateQuery<IMediaDocument>
) {
  await MediaModel.updateOne(query, update);
}

// export async function deleteMedia(media: Pick<Media, "email">) {
//   await MediaModel.updateOne({ email: media.email }, { $unset: { email: 1 } });
// }

export async function compressVideo(videoPath: string, outputPath: string) {
  return new Promise<void>((resolve, reject) => {
    const command = ffmpeg(videoPath)
      .outputOptions([
        "-c:v libx264",
        "-crf 23",
        "-preset veryfast",
        // "-b:v 1M",
      ])
      .output(outputPath)
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        console.error("Error compressing video", err);
        reject(err);
      })
      .run();
  });
}
