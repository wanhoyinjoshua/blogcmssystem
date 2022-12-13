// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

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

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,

    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  if(uploadURL){
    const imageurl= `https://kidsandcubsclinicblogsystem.s3.ap-southeast-2.amazonaws.com/${imageName}`
    return [uploadURL,imageurl]
  }
  else{
    return "error"
  }
  
}




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = await generateUploadURL()
  res.status(200).json({ imageurl: url})
}
