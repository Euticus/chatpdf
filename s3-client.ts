// require('dotenv').config({path:__dirname+'chatpdf/.env'})
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: 'us-west-1', 
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_PUBLIC_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
})

export default s3Client;

