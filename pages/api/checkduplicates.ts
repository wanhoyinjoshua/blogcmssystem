import prisma from "../../lib/prisma"

export default async function assetHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        console.log(req.query.blog)
        var formattedblogname= req.query.blog.toLowerCase().replace(/\s/g, '-')
        const duplicate = await prisma.blogs.findUnique({
            where: {
            blogtitleid: `${formattedblogname}`
          },
        })
        console.log(duplicate)
        if (duplicate==null){
          var welcomemessage={
            "type": "doc",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "Wow, this editor instance exports its content as JSON."
                  }
                ]
              }
            ]
          }
          
          const newblogpost = await prisma.blogs.create({
            data: {
              blogtitleid:formattedblogname,
              body: '',
              timeupdated:"",
              jsondata:JSON.stringify(welcomemessage),
              slug:formattedblogname,
              imagepreview:""
            },
          })
            res.status(200).json({duplicate:newblogpost})

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