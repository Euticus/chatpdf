// import AWS from 'aws-sdk'
// require('dotenv').config()

import s3Client from "@/s3-client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from 'stream-browserify';
// let Readable: any;
// if (typeof window === 'undefined') {
//   // This code will only run on the server
//   Readable = require('stream').Readable;
// }

import { createWriteStream } from 'fs'

export async function downloadFromS3(file_key: string): Promise<string> {
    try {
        const obj = await s3Client.send(
          new GetObjectCommand({ Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!, Key: file_key }),
        );
        const file_name = `/tmp/pdf-${Date.now()}.pdf`;

        const file = createWriteStream(file_name);

        return new Promise((resolve, reject) => {
            // @ts-ignore
            obj.Body?.pipe(file) // Pipe the Node.js stream to the file
                .on('finish', () => {
                    console.log("File downloaded successfully.\n");
                    return resolve(file_name);
                })
                .on('error', reject);
        });

    } catch (error) {
        console.log("Couldn't download file from S3:", error);
        throw error;
    }
}





// export const downloadFilesFromBucket = async ({ bucketName }) => {
//     const { Contents } = await s3Client.send(
//       new ListObjectsCommand({ Bucket: bucketName }),
//     );
//     const path = await promptForText("Enter destination path for files:");
  
//     for (let content of Contents) {
//       const obj = await s3Client.send(
//         new GetObjectCommand({ Bucket: bucketName, Key: content.Key }),
//       );
//       writeFileSync(
//         `${path}/${content.Key}`,
//         await obj.Body.transformToByteArray(),
//       );
//     }
//     console.log("Files downloaded successfully.\n");
//   };


// credentials: {
//     accessKeyId: process.env.NEXT_PUBLIC_S3_PUBLIC_ACCESS_KEY_ID,
//     secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
// }


