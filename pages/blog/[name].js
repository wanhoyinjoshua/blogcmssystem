import Head from 'next/head'
import { useRouter } from 'next/router'
import useAutosizeTextArea from "../../hooks/autoresize"
import React, { useEffect, useState,useRef } from 'react'



import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import TextAlign from '@tiptap/extension-text-align'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import{ useCallback } from 'react'
import axios from "axios"
import { generateHTML } from '@tiptap/html'
import Link from "next/link"



const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }
 




  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </button>
   
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        justify
      </button>
      <button onClick={() => editor.chain().focus().unsetTextAlign().run()}>unsetTextAlign</button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
      
    </>
  )
}




export default function Home(props) {
  const editor = useEditor({
    extensions: [
      Document, Paragraph, Text, Image, Dropcursor,StarterKit,Heading,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: props.onepost,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      sethtml(json)
      console.log(html)

     
      // send the content to an API here
    }
  })
  const [mainheading, setValue] = useState(props.title);
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef.current, mainheading);

  const handleChange = (evt) => {
    const val = evt.target?.value;

    setValue(val);
  };
  const [originalimagestack , setimagestack]= useState([])
  const [realslug,setslug]=useState(props.slug)
  const router = useRouter()
  const  blogname  = router.query




  useEffect(() => {
    // Update the document title using the browser API
    setimagestack(props.image)
    
    
    
  },[props]);


  
  const [html,sethtml] = useState()

  const checktoupload= async(htmldup)=>{
    var updatedimagelist=[]
    
    for (let i = 0; i < htmldup.content.length; i++) {
      console.log(htmldup.content[i].type)
      if(htmldup.content[i].type=="image"){
        if(htmldup.content[i].attrs.src.includes("blob")){
          let blob = await fetch(htmldup.content[i].attrs.src).then(r => r.blob());
          
          const  signedurl  = await fetch("/api/s3url").then(res => res.json())
          
  
        const res= await fetch(signedurl.imageurl[0] , {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*"
            },
            body: blob
          
          })
  
          //now then put it into the image tag 
          //create a duplicate of the state object
         
          htmldup.content[i].attrs.src= signedurl.imageurl[1]
          

        }
        else{
          continue

        }
        
       

      }
    }
    
    
   
 

    return htmldup


  }

  const checktodelete= async(htmldup)=>{
    var imagelist=[]
    for (let i = 0; i < htmldup.content.length; i++) {
      
      if(htmldup.content[i].type=="image"){
        if(htmldup.content[i].attrs.src.includes("blob")!=true){
          imagelist.push(htmldup.content[i].attrs.src)



        }
      }

  }
  //original list is 
  var oldlist= originalimagestack
  var newlist= imagelist
  //if new list < oldlist that means someting has been deleted and I need to delete it from aws 

 
  let difference = oldlist.filter(x => !newlist.includes(x));
  console.log(difference)
  //now just simply delete the difference 
  if(difference.length==0){
    console.log("there is nothing to delete")
    
    

  }
  else{
    await axios.post(`${process.env.APIPATH}/api/getdeleteurl`,{data:JSON.stringify(difference)})

    
  }
  
  
  }



  const savehtml=async ()=>{
    //data is in html
    console.log(html.content)
    let imagelist=[]
    //run a for loop in content and find the image tag 
    var htmldup= html
    //check to see if i need to delete any object from the s3 bucket
    const deleteimage = await checktodelete(htmldup)
    const savedjsondata= await checktoupload(htmldup)
    console.log(mainheading)
    
    function checkarray(str){
      var chararray = str.split("")
      console.log(chararray)
      var regex = /^[A-Za-z0-9? ]+$/
      console.log(chararray[chararray.length-1])
      if(regex.test(mainheading)==false){
        
        return false  

      }
    
      else{
        //valid input
        return str.trim()
      }
    }

   

    var formaattedheading= await checkarray(mainheading)
    if(formaattedheading==false){
      window.alert("invalid title")
      return
    }
    

    var slug= formaattedheading.toLowerCase().replace(/\s/g, '-').replace("?",'')
    setslug(slug)
    for (let i = 0; i < savedjsondata.content.length; i++) {
      
      if(savedjsondata.content[i].type=="image"){
        if(savedjsondata.content[i].attrs.src.includes("blob")!=true){
          imagelist.push(savedjsondata.content[i].attrs.src)



        }
      }
     

  }
  console.log(imagelist)
  //original list is 
  /*
  var oldlist= originalimagestack
  var newlist= imagelist
  console.log(oldlist)
  console.log(newlist)
  */
  setimagestack(imagelist)
    
  console.log(savedjsondata)
    //i have the most updated json blob right here 
    const savedhtmldata = await generateHTML(savedjsondata, [
        Document,
        Paragraph,
        Text,
        Dropcursor,
        StarterKit,
        Image,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Heading
        // other extensions …
      ])
    
   
    const finalupload={json:savedjsondata,html:savedhtmldata,articleid:props.postid, heading:formaattedheading, slug:slug, date:new Date().toLocaleDateString(),imagepreview:imagelist[0]}
    //set the state here so the latest state is the image list 
    console.log(finalupload)
    // now time to push the data to server
    const uploadresponse = await axios.post(`${process.env.APIPATH}/api/savedata`, finalupload)
    
    if(uploadresponse.data.duplicate==true){
      window.alert("the title of this page has already been used")
    }
    else{
      //nmothing happens
    }


  


    
    
  }
  
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const changeHandler = async (event) => {
		const url = URL.createObjectURL(event.target.files[0]);
    const alt = window.prompt("please provide an alt tag for the image please")
    if (url&&alt) {
      editor.chain().focus().setImage({ src: url, alt: alt }).run()
    }
        let blob = await fetch(url).then(r => r);
        
		
	};
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='utilitybar'>
        
        <Link href='/'>Homepage</Link>

        
        
      </div>
      <main className="editorframe">
      
      <div>{blogname.name}</div>
      <MenuBar editor={editor} />
      <button onClick={addImage}>setImageonline</button>
       <input

      type='file'

      onChange={changeHandler}
       
      >
        
        
      </input>
      <button onClick ={savehtml}>save the draft online</button>

      <Link href={`/preview/${realslug}`}><button>Preview the article onlibne</button></Link>
      <br></br>
      <textarea
        className="titletext"placeholder='Type in your title here' contenteditable
        onChange={handleChange}
        
        ref={textAreaRef}
        rows={1}
        value={mainheading}
      />
      <EditorContent  editor={editor} 
      />
  
      

      </main>
     

    </div>
  )
}

export async function getStaticProps({ params }) {
  let blogname = params.name
  console.log(blogname)
  const res = await axios.get(`${process.env.APIPATH}/api/getonepost?postid=${blogname}`);
  var parsedjsondata= JSON.parse(res.data.onepost.jsondata)
  console.log(parsedjsondata)
  var imagelist=[]
  for (let i = 0; i < parsedjsondata.content.length; i++) {
    
    if(parsedjsondata.content[i].type=="image"){
      if(parsedjsondata.content[i].attrs.src.includes("blob")!=true){
        //then add to picture list 
        imagelist.push(parsedjsondata.content[i].attrs.src)

      }
    }

  }
  
  return {
    props: {
      onepost:parsedjsondata,
      image:imagelist,
      postid:blogname,
      title:res.data.onepost.h1,
      slug:res.data.onepost.slug
      
      
    }
  }
}

export async function getStaticPaths(props) {
  const res = await axios.get(`${process.env.APIPATH}/api/getallposts`);
  console.log(res)
  const paths = res.data.allpost.map((article) => ({
      params: { name: article.blogtitleid },
    }))
  return {
    paths,
    fallback: false
  }
}



