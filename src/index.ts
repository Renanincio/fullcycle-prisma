import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  await prisma.student.create({
    data: {
      name: "Renan Inacio",
      email: "renanincio@gmail.com",
      enrollments: {
        create: {
          trail: {
            connect: {
              slug: "trilha-de-react",
            },
          },
        },
      },
    },
  });

  const students = await prisma.student.findMany({
    include: {
      enrollments: {
        include: {
          trail: true,
        },
      },
    },
  });

  console.log(JSON.stringify(students, null, 2));

  await Promise.all([
    prisma.trail.findUnique({
        where: {
            slug: "trilha-de-react",
        }
      }),
      prisma.trail.findUnique({
        where: {
            slug: "trilha-de-react",
        }
      })
  ])
}

main();
