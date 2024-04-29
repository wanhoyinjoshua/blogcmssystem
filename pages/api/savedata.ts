

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand,UpdateCommand, DynamoDBDocumentClient,DeleteCommand } from "@aws-sdk/lib-dynamodb";

export default async function savepost(req, res) {
  const { method } = req
  const client = new DynamoDBClient(
    {
      region: process.env.region,
      credentials:{
        accessKeyId: process.env.blogid,
        secretAccessKey:process.env.blogsecret
    }//O(1)



    });
const docClient = DynamoDBDocumentClient.from(client);//O(1)



  switch (method) {
    case 'POST':
      try {
       
     

        var originaldraftstatus=req.body.originaldraftstatus
        var imagepreview="" //O(1)
        if(req.body.imagepreview==undefined){//O(1)
          imagepreview=""//O(1)
        }
        else{
          imagepreview= req.body.imagepreview//O(1)

        }
        //this put command will create one if blogid is non existent and update if existing
       //put command
       const putcreate = new PutCommand({
        TableName: "kidsandcubsclinicblog",
        Item: {
          "blogid":req.body.articleid,
          "body":req.body.html,
          "jsondata": JSON.stringify(req.body.json),
          "h1": req.body.heading,
          "timeupdated":req.body.date,
          "slug": req.body.slug,
          "imagepreview":imagepreview,
          "published":req.body.draftstatus
        },
      });


      const deletecommand = new DeleteCommand({
        TableName: "kidsandcubsclinicblog",
      
        Key: {
          "blogid":req.body.articleid,
         
          "published":Number(originaldraftstatus)
        },
      });
       
       
      
      
        const response0= await docClient.send(deletecommand);

        const response=await docClient.send(putcreate)


        /*
        ,
            "body":req.body.html,
            "jsondata": JSON.stringify(req.body.json),
            "h1":req.body.heading,
            "timeupdated":req.body.date,
            "slug": req.body.slug,
            "imagepreview":imagepreview,
            */

        res.status(200).json({error:response})




        //the whole function is O(1) complexity
        
        
     


      


        
        
        
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching posts' })
      }
      break
    default:
      res.setHeader('Allow', ['POST','PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}