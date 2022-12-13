import prisma from "../../lib/prisma"

export default async function findonepost(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        
        
        const onepost = await prisma.blogs.findUnique({
            where: {
                blogtitleid: `${req.query.postid}`
              },


        })
        console.log(onepost)
        
        
        res.status(200).json({onepost:onepost})

        
        
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