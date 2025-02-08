import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { File } from 'node:buffer';

export const storageClient = new S3Client({
    forcePathStyle: true,
    region: 'eu-central-1',
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
});

export const uploadImageToS3 = async (file: File, key: string) => {
    try {
        const image = Buffer.from(await file.arrayBuffer());
        // Set up the parameters for the PutObjectCommand
        const uploadParams = {
            Bucket: 'window-images',
            Key: key, // The file name in S3
            Body: image, // The file content
            ContentType: 'image/jpeg', // Or other image type (e.g., 'image/png')
        };

        // Create the command and send it to S3
        const command = new PutObjectCommand(uploadParams);
        const response = await storageClient.send(command);

        console.log('Upload success', response);
        return response;
    } catch (error) {
        console.error('Error uploading image: ', error);
        throw error;
    }
};
