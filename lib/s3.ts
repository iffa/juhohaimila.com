import { S3 } from "aws-sdk";

const s3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

export interface Image {
  name: string;
  url: string;
}

/**
 * Get image url by name.
 * @param key Asset key
 */
export function getImageUrl(key: string): string {
  return new URL(
    `${process.env.S3_BUCKET}/${key}`,
    s3.endpoint.href
  ).toString();
}

/**
 * List all available images.
 */
export async function listImages(): Promise<Image[]> {
  try {
    const objects = await s3
      .listObjects({ Bucket: process.env.S3_BUCKET })
      .promise();

    return objects.Contents.map((object) => {
      return {
        name: object.Key,
        url: getImageUrl(object.Key),
      };
    });
  } catch {
    // fallback to no images in case there is an issue with the connection
    return [];
  }
}
