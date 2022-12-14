import Image from 'next/image';
import { ClientProps } from '../pages/dashboard';
import Client from './Client';

export default function ClientList({ clients }: ClientProps) {
  return (
    <>
      {clients.length > 0 ? (
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 md:mb-24'>
          {clients.map((client: any) => (
            <Client key={client.id} client={client} />
          ))}
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
