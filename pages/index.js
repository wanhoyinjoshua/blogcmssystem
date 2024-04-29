import axios from 'axios'
import React from 'react'
import Router from 'next/router'

import Blogpost from "../components/Blogpost"

import docClient from '../lib/dynamodb'
import {ScanCommand} from "@aws-sdk/lib-dynamodb";

const index = (props) => {
  const createproject =async()=>{
    const projectname= window.prompt("What is the project name?")

    const duplicate = await axios.get(`/api/checkduplicates?blog=${projectname}`)
    if(duplicate.data.duplicate==true){
      //go ahead and create a new project 
      window.alert("you have an exisitg project with the same name")

    }
    else{
      //error message cant create a new project
      window.alert("congragulations you successfuly created a new blog paage")
     
      Router.push(`/blog/${duplicate.data.duplicate.blogid}`)
     
     
    }
   
    //then check against database for existing project 

  }
  return (
    <div className='homepagemaster'>

      <button onClick={createproject}>
        Create a new project 
        
      
      </button>

      <div className='tag'>
          Blog Home page
        </div>
      <div className="hommepagemain">
      
      {props.data.map((e)=>{
       return (
        

        <Blogpost key={e.blogtitleid} heading={e.heading} picture={e.picture} date={e.time} blogtitleid={e.blogtitleid}  published={e.published}></Blogpost>

     );})}
       
        

      </div>

      


    </div>
  )
}

export default index



export async function getServerSideProps() {
  //need to find all posts...
  const input = {
    
    "ExpressionAttributeValues": {
        ":value": 0,
        ":value2":1
       
    },
    "FilterExpression": "published = :value or published = :value2",
    
    "ProjectionExpression": "imagepreview,blogid,timeupdated,h1,published",
    "TableName": "kidsandcubsclinicblog"
  };

  const command = new ScanCommand(input)
  const response = await docClient.send(command);
  console.log(response)

 
 
  const data = response["Items"].map((article) => ({
    picture: article.imagepreview,
    blogtitleid:article.blogid,
    time:article.timeupdated,
    heading:article.h1,
    published:article.published
  }))
  
  
  return {
    props: {
     data
      
      
    }
  }
}




