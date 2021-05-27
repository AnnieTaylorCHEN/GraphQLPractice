import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

async function main() {
//     await prisma.user.create({
//         data: {
//           name: 'Alice',
//           email: 'alice@prisma.io',
//           posts: {
//             create: { title: 'Hello World' },
//           },
//           profile: {
//             create: { bio: 'I like ice-creams.' },
//           },
//         },
//       })
  
//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//       profile: true,
//     },
//   }) 
//   console.dir(allUsers, { depth: null })
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })
  console.log(post)
 
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })