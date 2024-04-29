

import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

import docClient from "../../lib/dynamodb"

export default async function findonepost(req, res) {
  const { method } = req


  switch (method) {
    case 'POST':
      try {
        console.log(req.query.draftstatus)
        console.log(req.query)
        console.log(req.query.postid)
        const command = new DeleteCommand({
          TableName: "kidsandcubsclinicblog",
        
          Key: {
            "blogid":req.query.postid,
           
            "published":Number(req.query.draftstatus)
          },
        });
      
        const response = await docClient.send(command);
        console.log(response)
        

        
        
        
        
        
        res.status(200).json({onepost:response})

        
        
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching posts' })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}