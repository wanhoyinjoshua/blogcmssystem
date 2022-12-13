import Heading from "@tiptap/extension-heading"
import prisma from "../../lib/prisma"

export default async function savepost(req, res) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        
        const dupslug= await prisma.blogs.findUnique({
          where: {
          slug: req.body.slug
        },
      })
      console.log(dupslug)

      if(dupslug==null||dupslug.blogtitleid==req.body.articleid){
        console.log(req.body)
        const onepost = await prisma.blogs.update({
            where: {
                blogtitleid: `${req.body.articleid}`
              },
              data:{
                body:req.body.html,
                jsondata: JSON.stringify(req.body.json),
                h1:req.body.heading,
                timeupdated:req.body.date,
                slug: req.body.slug,
                imagepreview:req.body.imagepreview
                

              },


        })
        
        
        
        res.status(200).json({onepost:onepost})


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
      res.setHeader('Allow', ['POST','PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}