import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';
import SessionContext from '../components/SessionContext';
import Layout from '../components/Layout';
import AuthBtn from '../components/AuthBtn';
import Button from '../components/Button';
import ClientList from '../components/ClientList';
const getAllClientsByUserId = require('../prisma/Client').getAllClientsByUserId;

export type ClientProps = {
  [key: string]: any;
};

const DashBoard: NextPage = ({ clients }: ClientProps) => {
  const { data: session, status } = useSession();

  const { loginSession, setLoginSession, setLoginStatus } =
    useContext(SessionContext);

  useEffect(() => {
    setLoginSession(session);
    setLoginStatus(status);
  }, [session, status, loginSession, setLoginSession, setLoginStatus]);

  return (
    <Layout>
      <div className='absolute top-16 md:top-4 md:right-8'>
        <AuthBtn />
      </div>
      <article>
        <h2 className='font-medium text-xl text-gray-400 antialiased mb-8 text-left'>
          {clients.userId === loginSession?.user?.id
            ? 'Generate Invoice or Add Client'
            : 'Add Client To Generate Invoice'}
        </h2>

        <ClientList clients={clients} />

        <div className='text-center mt-8'>
          <Button type='button' buttonText='Add Client' />
        </div>
      </article>
    </Layout>
  );
};

export default DashBoard;
