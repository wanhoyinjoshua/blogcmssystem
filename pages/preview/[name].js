import Head from 'next/head'
import { useRouter } from 'next/router'
import prisma from "../../lib/prisma"
import React, { useEffect, useState } from 'react'
// Import the Slate editor factory.

import Navbar from "../../components/Navbar"


// Import the Slate components and React plugin.







export default function Home(props) {
  


  const router = useRouter()
  const  blogname  = router.query




  


  
  



 
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="editorframe">
      <Navbar></Navbar>
      
      <div>Project Name</div>
      <div className='Previewarticle'>
      <h1 className="previewheader">{props.heading}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.onepost }}></div>
    </div>

      
     

      
      
      
 
      
      
      

      </main>
     

    </div>
  )
}

export async function getServerSideProps({ params }) {
  let slug = params.name
  
//

  const onepost = await prisma.blogs.findUnique({
    where: {
        slug: `${slug}`
      },


})
if(onepost==undefined){
  return {
    redirect: {
      permanent: false,
      destination: "/blog-post-not-found"
    }
  }
}
else{
  var html= onepost.body
  var heading = onepost.h1
   
  return {
    props: {
      onepost:html,
      
      postid:slug,
      heading:heading
      
      
    }
  }

}

///

  
 
}

/*
export async function getStaticPaths(props) {
  
///

const allpost = await prisma.blogs.findMany()
  
   
    const paths = allpost.map((article) => ({
      params: { name: article.slug },
    }))
    return {
      paths,
      fallback: false
    }

  //


  
 
}
*/



