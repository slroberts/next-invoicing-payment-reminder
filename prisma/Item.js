import prisma from './lib/prisma';

export const getItemById = async (id) => {
  const item = await prisma.item.findUnique({
    where: {
      id: id,
    },
    include: {
      client: true,
    },
  });
  return item;
};

export const createItem = async (itemName, rate, hours, clientId) => {
  const newItem = await prisma.item.create({
    data: {
      itemName,
      rate,
      hours,
      client: {
        connect: { id: clientId },
      },
    },
  });
  const item = await getItemById(newItem.id);

  return item;
};

export const getAllItemsByClientId = async (id) => {
  const items = await prisma.item.findMany({
    where: {
      clientId: id,
    },
    include: {
      client: true,
    },
  });

  return items;
};

export const deleteItem = async (id) => {
  const deletedItem = await prisma.item.delete({
    where: {
      id: id,
    },
    include: {
      client: true,
    },
  });

  return deletedItem;
};
