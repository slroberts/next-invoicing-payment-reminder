import { GetServerSideProps } from 'next';
import Router from 'next/router';
import Link from 'next/link';
import { useRef } from 'react';
import { ClientProps } from '../../dashboard';
import { getClientById } from '../../../prisma/Client';
import { getAllItemsByClientId } from '../../../prisma/Item';
import useForm from '../../../utils/useForm';
import { fetcher } from '../../../utils/fetcher';
import AuthBtn from '../../../components/AuthBtn';
import Layout from '../../../components/Layout';
import ItemList from '../../../components/ItemList';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const client = await getClientById(id);
  const items = await getAllItemsByClientId(id);
  return { props: { client, items } };
};

const Client = (props: ClientProps) => {
  const { clientName, email, phoneNumber } = props.client;
  const clientId = props.client.id as string;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

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
  const cancelButtonRef = useRef(null);

  function handleAddItem() {
    fetcher('/api/item', {
      itemName: formValues.itemName,
      rate: formValues.rate,
      hours: formValues.hours,
      clientId,
    });

    Router.reload();
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
        <div className='md:pr-12'>
          <h2 className='font-semibold text-sm uppercase text-gray-800 whitespace-nowrap'>
            Client Information
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-1'>
            <div>
              <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
                Name
              </h4>
              <p className='capitalize'>{clientName}</p>
            </div>
            <div>
              <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
                Email
              </h4>
              <p>{email}</p>
            </div>
            <div>
              <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
                Phone
              </h4>
              <p>{phoneNumber}</p>
            </div>
            <div>
              <h4 className='font-bold text-xs uppercase mt-4 text-gray-400'>
                Date
              </h4>
              <p>{today.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className='md:pl-12 w-full'>
          <ItemList items={props.items} />

          <Modal modalTitle='Client Information' open={open} setOpen={setOpen}>
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

          {props.items.length > 0 ? (
            <div className='divide-y mt-8'>
              <div className='flex justify-between'>
                <div className='px-6 py-4 col-start-2'>Tax</div>
                <div className='px-6 py-4 text-right'>US$ Sales Tax</div>
              </div>
              <div className='flex justify-between font-bold'>
                <div className='px-6 py-4'>Total</div>
                <div className='px-6 py-4 text-right'>US$ Total Amount</div>
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </Layout>
  );
};

export default Client;
