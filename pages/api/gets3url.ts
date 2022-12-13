// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router';
type Data = {
  imageurl: any
}
import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = process.env.region
const bucketName = process.env.bucketname
const accessKeyId = process.env.keyid
const secretAccessKey = process.env.accesskey

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})



export async function generateGetURL(imageName) {


  const params = ({
    Bucket: bucketName,
    Key: imageName,
    
    Expires: 60
  })
  
  const GetURL = await s3.getSignedUrlPromise('getObject', params)
  return GetURL
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const url = await generateGetURL(req.query.image)
  res.status(200).json({imageurl:url})
}
