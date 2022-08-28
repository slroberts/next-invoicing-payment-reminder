import { NextPage } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession, useSession } from 'next-auth/react';
import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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

  const clients = await getAllClientsByUserId(session?.user?.id);
  return {
    props: { clients },
  };
};

const DashBoard: NextPage = ({ clients }: ClientProps) => {
  const cancelButtonRef = useRef(null);
  const { data: session, status } = useSession();
  const { loginSession, setLoginSession, setLoginStatus } =
    useContext(SessionContext);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    clientName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setLoginSession(session);
    setLoginStatus(status);
  }, [session, status, loginSession, setLoginSession, setLoginStatus]);

  const toggleModal = () => {
    setOpen(!open);
    setFormValues({
      clientName: '',
      email: '',
      phoneNumber: '',
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e: any) => {
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    let res = await fetch('/api/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientName: formValues.clientName,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        loginSession,
      }),
    });
    const newClient = await res.json();
    console.log('Create successful', { newClient });
    setFormValues({
      clientName: '',
      email: '',
      phoneNumber: '',
    });
    setOpen(false);
  };

  console.log(clients);

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
        <Modal
          modalTitle='Client Information'
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
        >
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4'
            method='post'
          >
            <div>
              <label className='font-medium' htmlFor='clientName'>
                Full Name
              </label>
              <input
                className='mt-2 border w-full p-3 border-blue-100 rounded'
                id='clientName'
                type='text'
                name='clientName'
                value={formValues.clientName}
                onChange={handleChange}
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
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className='font-medium' htmlFor='phoneNumber'>
                Phone Number
              </label>
              <input
                className='mt-2 border w-full p-3 border-blue-100 rounded'
                id='phoneNumber'
                type='text'
                name='phoneNumber'
                value={formValues.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
          </form>
          <div className='mt-4 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <Button
              type='button'
              buttonText='Save Client'
              onClick={handleSubmit}
              customStyle='w-full mb-6 sm:ml-4 sm:mb-0 sm:w-auto'
            />
            <Button
              type='button'
              buttonText='Cancel'
              onClick={() => setOpen(false)}
              customStyle='w-full sm:w-auto !bg-none !border !text-slate-400 !font-normal hover:border-blue-400 !hover:bg-none hover:hue-rotate-0 !hover:shadow-md'
              ref={cancelButtonRef}
            />
          </div>
        </Modal>

        <div className='text-center mt-8'>
          <Button type='button' buttonText='Add Client' onClick={toggleModal} />
        </div>
      </article>
    </Layout>
  );
};

export default DashBoard;
