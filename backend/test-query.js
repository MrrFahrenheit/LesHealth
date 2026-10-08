const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const routines = await prisma.les_user_routine.findMany({
    include: { les_routine_event: true }
  });
  console.log(JSON.stringify(routines, null, 2));
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });

