import { GetStaticPaths, GetStaticProps } from 'next';
import AuthBtn from '../../../components/AuthBtn';
import Layout from '../../../components/Layout';
import { PrismaClient } from '@prisma/client';
import { ClientProps } from '../../dashboard';
import { getClientById } from '../../../prisma/Client';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = parseInt(ctx?.params?.id as string);

  const client = await getClientById(id);

  return { props: client };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const prisma = new PrismaClient();
  const clients = await prisma.client.findMany();

  const paths = clients.map((a) => {
    return { params: { id: a.id.toString() } };
  });

  return {
    fallback: true,
    paths,
  };
};

const Client = ({ clientName, email, phoneNumber }: ClientProps) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return (
    <Layout>
      <div className='absolute top-16 md:top-4 md:right-8'>
        <AuthBtn />
      </div>
      <h2>Client Information</h2>
      <h4>Name</h4>
      <p>{clientName}</p>
      <h4>Email</h4>
      <p> {email}</p>
      <h4>Phone</h4>
      <p>{phoneNumber}</p>
      <p>{today.toLocaleDateString()}</p>
    </Layout>
  );
};

export default Client;
