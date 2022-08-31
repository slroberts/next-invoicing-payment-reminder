import { getSession } from 'next-auth/react';
import { createClient, deleteClient } from '../../prisma/Client';

export default async function handle(req, res) {
  const session = await getSession({ req });

  if (req.method == 'POST') {
    const { clientName, email, phoneNumber } = req.body;

    const client = await createClient(clientName, email, phoneNumber, session);

    return res.json(client);
    
  } else if (req.method == 'DELETE') {
    const { id } = req.body;

    const client = await deleteClient(id);

    return res.json(client);
  }
}
