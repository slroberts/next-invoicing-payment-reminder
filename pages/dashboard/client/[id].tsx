import { GetServerSideProps } from 'next';
import AuthBtn from '../../../components/AuthBtn';
import Layout from '../../../components/Layout';
import { ClientProps } from '../../dashboard';
import { getClientById } from '../../../prisma/Client';
import { getAllItemsByClientId } from '../../../prisma/Item';
import Link from 'next/link';
import Router from 'next/router';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { ChangeEventHandler, useRef, useState } from 'react';
import ItemList from '../../../components/ItemList';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id as string;
  const client = await getClientById(id);
  const items = await getAllItemsByClientId(id);
  return { props: { client, items } };
};

const Client = (props: ClientProps) => {
  const { clientName, email, phoneNumber } = props.client;
  const clientId = props.client.id;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    itemName: '',
    rate: '',
    hours: '',
  });
  const [disabled, setDisabled] = useState(true);

  const toggleModal = () => {
    setOpen(!open);
    setFormValues({
      itemName: '',
      rate: '',
      hours: '',
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    if (Object.keys(formValues).length !== 0) {
      setDisabled(false);
    }
  };

  const handleSubmit = async () => {
    let res = await fetch('/api/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemName: formValues.itemName,
        rate: formValues.rate,
        hours: formValues.hours,
        clientId,
      }),
    });

    const newItem = await res.json();
    console.log(newItem);

    setFormValues({
      itemName: '',
      rate: '',
      hours: '',
    });

    setOpen(false);

    Router.reload();
  };

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
                <label className='font-medium' htmlFor='itemName'>
                  Item Name
                </label>
                <input
                  className='mt-2 border w-full p-3 border-blue-100 rounded'
                  id='itemName'
                  type='text'
                  name='itemName'
                  value={formValues.itemName}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
