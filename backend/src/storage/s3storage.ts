import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { File } from 'node:buffer';

export const storageClient = new S3Client({
    forcePathStyle: true,
    region: 'eu-central-1',
    endpoint: Bun.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: Bun.env.S3_ACCESS!,
        secretAccessKey: Bun.env.S3_SECRET_ACCESS_KEY!,
    },
});

export const uploadImageToS3 = async (file: File, key: string) => {
    if (!file) {
        console.log('No image provided, skipping upload');
        return null;
    }

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

export const getImageFromS3 = async (key: string) => {
    if (!key) {
        console.log('No image key provided');
        return null;
    }
    try {
        // Create the command and send it to S3
        const command = new GetObjectCommand({
            Key: key,
            Bucket: 'window-images',
        });
        const response = await storageClient.send(command);
        const imageStream = response.Body;

        console.log('Download success', imageStream);
        return imageStream;
    } catch (error) {
        console.error('Error uploading image: ', error);
        throw error;
    }
};
