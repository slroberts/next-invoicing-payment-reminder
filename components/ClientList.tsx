import Image from 'next/image';
import { useContext } from 'react';
import { ClientProps } from '../pages/dashboard';
import SessionContext from './SessionContext';
import Client from './Client';

export default function ClientList({ clients }: ClientProps) {
  const { loginSession } = useContext(SessionContext);

  return (
    <>
      {clients ? (
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 md:mb-24'>
          {clients.map((client: any) =>
            client.userId === loginSession?.user?.id ? (
              <Client key={client.id} client={client} />
            ) : null
          )}
        </div>
      ) : (
        <figure className='text-center opacity-20'>
          <Image
            src='/images/undraw_fill_in_mie5.svg'
            alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
            width={520}
            height={380}
            priority
          />
        </figure>
      )}
    </>
  );
}
