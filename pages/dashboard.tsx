import { NextPage } from 'next';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import AuthBtn from '../components/AuthBtn';
import Button from '../components/Button';
import ClientList from '../components/ClientList';
import { useSession } from 'next-auth/react';

export type ClientProps = {
  [key: string]: any;
};

const DashBoard: NextPage = ({ clients }: ClientProps) => {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className='absolute top-16 md:top-4 md:right-8'>
        <AuthBtn />
      </div>
      <article>
        <h2 className='font-medium text-xl text-gray-400 antialiased mb-8 text-left'>
          {clients
            ? 'Generate Invoice or Add Client'
            : 'Add Client To Generate Invoice'}
        </h2>

        <ClientList clients={clients} session={session} />

        <div className='text-center mt-8'>
          <Button type='button' buttonText='Add Client' />
        </div>
      </article>
    </Layout>
  );
};

export default DashBoard;

export async function getStaticProps() {
  const clients = await prisma.client.findMany({
    include: {
      user: true,
    },
  });

  return {
    props: { clients },
  };
}
