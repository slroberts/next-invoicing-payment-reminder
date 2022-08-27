import { NextPage } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import SessionContext from '../components/SessionContext';
import Layout from '../components/Layout';
import AuthBtn from '../components/AuthBtn';
import Button from '../components/Button';
import ClientList from '../components/ClientList';
import Modal from '../components/Modal';
const getAllClientsByUserId = require('../prisma/Client').getAllClientsByUserId;

export type ClientProps = {
  [key: string]: any;
};

export const getServerSideProps = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getSession({ req });

  if (!session) {
    return { props: { clients: [] } };
  }

  const clients = await getAllClientsByUserId(session?.userId);
  return {
    props: { clients },
  };
};

const DashBoard: NextPage = ({ clients }: ClientProps) => {
  const { data: session, status } = useSession();
  const { loginSession, setLoginSession, setLoginStatus } =
    useContext(SessionContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoginSession(session);
    setLoginStatus(status);
  }, [session, status, loginSession, setLoginSession, setLoginStatus]);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <Layout>
      <div className='absolute top-16 md:top-4 md:right-8'>
        <AuthBtn />
      </div>
      <article>
        <h2 className='font-medium text-xl text-gray-400 antialiased mb-8 text-left'>
          {loginSession?.user?.clients
            ? 'Generate Invoice or Add Client'
            : 'Add Client To Generate Invoice'}
        </h2>

        <ClientList clients={clients} />
        <Modal modalTitle='Client Information' open={open} setOpen={setOpen}>
          <form className='flex flex-col gap-4' method='post'>
            <div>
              <label className='font-medium' htmlFor='name'>
                Full Name
              </label>
              <input
                className='mt-2 border w-full p-3 border-blue-100 rounded'
                id='name'
                type='name'
                name='name'
                required
              />
            </div>
            <div>
              <label className='font-medium' htmlFor='email'>
                Email
              </label>
              <input
                className='mt-2 border w-full p-3 border-blue-100 rounded'
                id='email'
                type='email'
                name='email'
                required
              />
            </div>
            <div>
              <label className='font-medium' htmlFor='email'>
                Phone Number
              </label>
              <input
                className='mt-2 border w-full p-3 border-blue-100 rounded'
                id='email'
                type='email'
                name='email'
                required
              />
            </div>
          </form>
        </Modal>

        <div className='text-center mt-8'>
          <Button type='button' buttonText='Add Client' onClick={toggleModal} />
        </div>
      </article>
    </Layout>
  );
};

export default DashBoard;
