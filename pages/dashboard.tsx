import { GetServerSideProps, NextPage } from 'next';
import { useContext, useRef } from 'react';
import { useForm } from '../utils/useForm';
import { useFetch } from '../utils/useFetch';
import { getAllClientsByUserId } from '../prisma/Client';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import SessionContext from '../components/SessionContext';
import Layout from '../components/Layout';
import AuthBtn from '../components/AuthBtn';
import Button from '../components/Button';
import ClientList from '../components/ClientList';
import Modal from '../components/Modal';

export type ClientProps = {
  [key: string]: string | any;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
  const { loginSession } = useContext(SessionContext);
  const initialState = {
    clientName: '',
    email: '',
    phoneNumber: '',
  };

  const {
    disabled,
    formValues,
    open,
    setOpen,
    toggleModal,
    handleInputChange,
    handleSubmit,
  } = useForm(handleAddClient, initialState);

  const { fetcher } = useFetch('POST', '/api/client', {
    clientName: formValues.clientName,
    email: formValues.email,
    phoneNumber: formValues.phoneNumber,
    loginSession,
  });

  async function handleAddClient() {
    fetcher();
  }

  return (
    <Layout>
      <div className='absolute top-16 md:top-4 md:right-8'>
        <AuthBtn />
      </div>
      <article>
        <h2 className='font-medium text-xl text-gray-400 antialiased mb-8 text-left'>
          {clients.length > 0
            ? 'View Invoice or Add New Client'
            : 'Add Client To Generate Invoice'}
        </h2>

        <ClientList clients={clients} />

        <Modal modalTitle='Client Information' open={open} setOpen={setOpen}>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
          <div className='mt-4 py-3 sm:flex sm:flex-row-reverse'>
            <Button
              type='button'
              buttonText='Save Client'
              onClick={handleSubmit}
              customStyle='w-full mb-6 sm:ml-4 sm:mb-0 sm:w-auto'
              disabled={disabled}
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
