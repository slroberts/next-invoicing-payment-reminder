import { GetStaticPaths, GetStaticProps } from 'next';
import AuthBtn from '../../../components/AuthBtn';
import Layout from '../../../components/Layout';
import { PrismaClient } from '@prisma/client';
import { ClientProps } from '../../dashboard';
import { getClientById } from '../../../prisma/Client';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../../components/Button';

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id as string;

  const client = await getClientById(id);
  return { props: client };
};

export const getStaticPaths: GetStaticPaths = async () => {
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

const Client = ({ id, clientName, email, phoneNumber }: ClientProps) => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return (
    <Layout>
      <div className='absolute top-16 md:top-4 md:right-8'>
        <AuthBtn />
      </div>
      <Link href='/dashboard'>
        <a className='text-slate-300'>Back to Dashboard</a>
      </Link>
      <div className='my-6 font-bold'>Invoice: {id}</div>
      <article className='flex flex-col md:flex-row gap-4 sm:gap-16 divide-y-2 md:divide-y-0 md:divide-x-2'>
        <div className='flex flex-col'>
          <h2 className='font-semibold text-sm uppercase text-gray-800'>
            Client Information
          </h2>

          <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
            Name
          </h4>
          <p className='capitalize'>{clientName}</p>
          <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
            Email
          </h4>
          <p>{email}</p>
          <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
            Phone
          </h4>
          <p>{phoneNumber}</p>
          <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
            Date
          </h4>
          <p>{today.toLocaleDateString()}</p>
        </div>
        <div className='md:pl-12 w-full'>
          <figure className='text-center opacity-20'>
            <Image
              src='/images/undraw_fill_in_mie5.svg'
              alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
              width={520}
              height={380}
              priority
            />
          </figure>
          <div className='text-right'>
            <Button type='button' buttonText='Add Item' />
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Client;
