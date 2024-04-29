import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
  const client = new DynamoDBClient(
    {
      region: process.env.region,
      credentials:{
        accessKeyId: process.env.blogid,
        secretAccessKey:process.env.blogsecret
    }//O(1)



    });
   

    const docClient = global.docClient || DynamoDBDocumentClient.from(client);//O(1)

    if (process.env.NODE_ENV === 'development') global.docClient = docClient
    
    export default docClient
