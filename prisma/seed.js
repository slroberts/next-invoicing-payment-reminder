const { PrismaClient } = require('@prisma/client');
const { clients, items } = require('./data');
const prisma = new PrismaClient();

const load = async () => {
  try {
    // await prisma.client.deleteMany({});
    // console.log('Deleted records in client table');

    // await prisma.item.deleteMany({});
    // console.log('Deleted records in item table');

    await prisma.client.createMany({
      data: clients,
    });
    console.log('Added client data');

    await prisma.item.createMany({
      data: items,
    });
    console.log('Added item data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
