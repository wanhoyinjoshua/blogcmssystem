import axios from 'axios'
import React from 'react'
import Router from 'next/router'
import Image from 'next/image'
import Blogpost from "../components/Blogpost"

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
     
      Router.push(`/blog/${duplicate.data.duplicate.blogtitleid}`)
     
     
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
        
        <Blogpost key={e.blogtitleid} heading={e.heading} picture={e.picture} date={e.time} blogtitleid={e.blogtitleid}></Blogpost>

     );})}
       
        

      </div>

      


    </div>
  )
}

export default index



export async function getStaticProps() {
  
  const res = await axios.get(`https://blogcmssystem.vercel.app/api/getallposts`, { 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
});
  const data = res.data.allpost.map((article) => ({
    picture: article.imagepreview,
    blogtitleid:article.blogtitleid,
    time:article.timeupdated,
    heading:article.h1
  }))
  
  
  return {
    props: {
     data
      
      
    }
  }
}




