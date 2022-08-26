import prisma from '../lib/prisma';

export const getClientById = async (id) => {
  const client = await prisma.client.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
  return client;
};

export const createClient = async (clientName, email, phoneNumber) => {
  const newClient = await prisma.client.create({
    data: {
      clientName,
      email,
      phoneNumber,
      user: {
        connect: { email: session?.user?.email },
      },
    },
  });
  const client = await getClientById(newClient.id);

  return client;
};

export const getAllClientsByUserId = async (id) => {
  const clients = await prisma.client.findMany({
    where: {
      userId: id,
    },
    include: {
      user: true,
    },
  });

  return clients;
};
