'use server'

import { logger } from '@/utils/logger'
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  endpoint: process.env.S3_URL,
  region: 'sgp1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || '',
    secretAccessKey: process.env.S3_SECRET_KEY || '',
  },
})

type Input = {
  key: string
  body: FormData
}

export async function uploadObject(input: Input): Promise<string | undefined> {
  try {
    const file = input.body.get('file') as File | string

    if (!file || typeof file === 'string') {
      throw new Error('No file uploaded')
    }
    const bodyArrayBuffer = await file.arrayBuffer()
    const bodyBuffer = Buffer.from(bodyArrayBuffer)

    await s3Client.send(
      new PutObjectCommand({
        Bucket: `${process.env.S3_FOLDER}`,
        Key: input.key,
        Body: bodyBuffer,
        ACL: 'public-read',
      }),
    )
    return `${process.env.S3_URL}/${process.env.S3_FOLDER}/${input.key}`
  } catch (err) {
    logger.error('Error when upload file', err)
  }
}

export async function deleteFile(key: string): Promise<boolean> {
  try {
    const arrayKey = key.split('/')
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: `${process.env.S3_FOLDER}`,
        Key: arrayKey[4],
      }),
    )
    return true
  } catch (err) {
    logger.error('Error at', err)
    return false
  }
}
