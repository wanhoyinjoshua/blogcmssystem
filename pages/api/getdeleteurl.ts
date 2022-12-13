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
/*
export async function generatedeleteURL(imagelist) {
  

  const params = ({
    Bucket: bucketName,
    Key: imagelist,

    Expires: 60
  })
  
  const deleteurl = await s3.getSignedUrlPromise('deleteObject', params)
  if(deleteurl){
   
    return deleteurl
  }
  else{
    return "error"
  }
  
}
*/



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  var imagelist= JSON.parse(req.body.data)
  console.log(imagelist)
  
  for (let i=0; i<imagelist.length; i++){
    var imagekey= imagelist[i].split("https://kidsandcubsclinicblogsystem.s3.ap-southeast-2.amazonaws.com/")[1]
    await s3.deleteObject({
      Bucket:bucketName,
      Key:imagekey},function(err,data){
        if(err){
          console.log(err, err.stack)
  
        }else{
          console.log(data)
        }
  
    })
    
  }
 

  
  

  


  
  res.status(200).json({ imageurl: "hi"})
}
