import { createItem, deleteItem } from '../../prisma/Item';

export default async function handle(req, res) {
  if (req.method == 'POST') {
    const { itemName, rate, hours, clientId } = req.body;

    const item = await createItem(itemName, rate, hours, clientId);

    return res.json(item);
  } else if (req.method == 'DELETE') {
    const { id } = req.body;

    const item = await deleteItem(id);

    return res.json(item);
  }
}
