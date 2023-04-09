import { ERROR_MESSAGES } from "../types/enums";
import type { IMediaDocument, Media } from "../types/media";
import MediaModel from "../models/media";
import { FilterQuery, UpdateQuery } from "mongoose";

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

export async function insertMedia(user: Media) {
  const dbMedia: IMediaDocument = new MediaModel<Media>({
    ...user,
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
