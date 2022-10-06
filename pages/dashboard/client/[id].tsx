import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRef } from 'react';
import { ClientProps } from '../../dashboard';
import { getClientById } from '../../../prisma/Client';
import { getAllItemsByClientId } from '../../../prisma/Item';
import { useForm } from '../../../hooks/useForm';
import { useFetch } from '../../../hooks/useFetch';
import AuthBtn from '../../../components/AuthBtn';
import Layout from '../../../components/Layout';
import ItemList from '../../../components/ItemList';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import ClientInformation from '../../../components/ClientInformation';
import TaxAndTotal from '../../../components/TaxAndTotal';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const client = await getClientById(id);
  const items = await getAllItemsByClientId(id);
  return { props: { client, items } };
};

const Client = (props: ClientProps) => {
  const clientId = props.client?.id as string;
  const cancelButtonRef = useRef(null);

  const initialState = {
    itemName: '',
    rate: '',
    hours: '',
  };

  const {
    disabled,
    formValues,
    open,
    setOpen,
    toggleModal,
    handleInputChange,
    handleSubmit,
  } = useForm(handleAddItem, initialState);

  const { fetcher } = useFetch('POST', '/api/item', {
    itemName: formValues.itemName,
    rate: formValues.rate,
    hours: formValues.hours,
    clientId,
  });

  function handleAddItem() {
    fetcher();
  }

  return (
    <Layout>
      <div className='absolute top-16 md:top-4 md:right-8'>
        <AuthBtn />
      </div>
      <Link href='/dashboard'>
        <a className='text-slate-300'>Back to Dashboard</a>
      </Link>
      <div className='my-6 font-bold'>Invoice: {clientId}</div>
      <article className='flex flex-col md:flex-row gap-6 md:gap-16 divide-y-2 md:divide-y-0 md:divide-x-2'>
        <ClientInformation client={props.client} />

        <div className='md:pl-12 w-full'>
          <ItemList items={props.items} />

          <Modal modalTitle='Item Information' open={open} setOpen={setOpen}>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-4'
              method='post'
            >
              <div>
                <label className='font-medium' htmlFor='itemName'>
                  Item Name
                </label>
                <input
                  className='mt-2 border w-full p-3 border-blue-100 rounded'
                  id='itemName'
                  type='text'
                  name='itemName'
                  value={formValues.itemName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className='font-medium' htmlFor='rate'>
                  Rate
                </label>
                <input
                  className='mt-2 border w-full p-3 border-blue-100 rounded'
                  id='rate'
                  type='number'
                  min='0.00'
                  step='0.01'
                  name='rate'
                  value={formValues.rate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className='font-medium' htmlFor='hours'>
                  Hours
                </label>
                <input
                  className='mt-2 border w-full p-3 border-blue-100 rounded'
                  id='hours'
                  type='number'
                  min='0.00'
                  step='0.25'
                  name='hours'
                  value={formValues.hours}
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

          <div className='text-right mt-4'>
            <Button
              type='button'
              buttonText='Add Item'
              onClick={toggleModal}
              customStyle='!bg-none !border !text-slate-400 !py-2 !px-8 !font-normal hover:border-blue-400 !hover:bg-none hover:hue-rotate-0 !hover:shadow-md'
            />
          </div>

          <TaxAndTotal items={props.items} />
        </div>
      </article>
    </Layout>
  );
};

export default Client;
