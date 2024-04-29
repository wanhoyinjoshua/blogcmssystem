
import docClient from "../../lib/dynamodb"
import {   GetItemCommand} from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
export default async function assetHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        console.log(req.query.blog)
        var formattedblogname= req.query.blog.toLowerCase().replace(/\s/g, '-')
        const input = {
          Key: {
            blogid:{S:formattedblogname},
            published:{N:"1"||"0"}
               
               
            
              
            
          },
          TableName: "kidsandcubsclinicblog"
        };

        const command = new GetItemCommand(input);
        const response = await docClient.send(command);
       console.log(response)
        
        if (response["Item"]==null){
          var welcomemessage={
            "type": "doc",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "Write your blog here"
                  }
                ]
              }
            ]
          }
          
        

          //create 
          const command2 = new PutCommand({
            TableName: "kidsandcubsclinicblog",
            Item: {
              "blogid":formattedblogname,
              "body":"",
              "jsondata": JSON.stringify(welcomemessage),
              "h1":"",
              "timeupdated":"",
              "slug": formattedblogname,
              "imagepreview":"",
              "published":0
            },
          });
        
          const response = await docClient.send(command2);
            res.status(200).json({duplicate:{
              "blogid":formattedblogname,
              "body":'',
              "jsondata": JSON.stringify(welcomemessage),
              "h1":"",
              "timeupdated":"",
              "slug": formattedblogname,
              "imagepreview":"",
              "published":0,
              "response":response
            }})

        }
        else{
            res.status(200).json({duplicate:true})

        }
        
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching posts' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}