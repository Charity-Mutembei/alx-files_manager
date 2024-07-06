import Queue from 'bull';
import imageThumbnail from 'image-thumbnail';
import fs from 'fs';
import path from 'path';
import dbClient from '../utils/db';

const fileQueue = new Queue('fileQueue');

fileQueue.process(async (job, done) => {
  const { userId, fileId } = job.data;

  if (!fileId) {
    return done(new Error('Missing fileId'));
  }
  if (!userId) {
    return done(new Error('Missing userId'));
  }

  const file = await dbClient.db.collection('files').findOne({ _id: ObjectId(fileId), userId: ObjectId(userId) });
  if (!file) {
    return done(new Error('File not found'));
  }

  const sizes = [500, 250, 100];
  const options = sizes.map(size => ({ width: size }));

  try {
    for (const option of options) {
      const thumbnail = await imageThumbnail(file.localPath, option);
      const thumbnailPath = `${file.localPath}_${option.width}`;
      fs.writeFileSync(thumbnailPath, thumbnail);
    }
    done();
  } catch (error) {
    done(error);
  }
});
