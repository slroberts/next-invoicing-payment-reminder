import Image from 'next/image';
import Link from 'next/link';
import { useFetch } from '../hooks/useFetch';
import { ClientProps } from '../pages/dashboard';
import Button from './Button';

export default function Client({ client }: ClientProps) {
  const { fetcher } = useFetch('DELETE', '/api/client', client);

  return (
    <div
      key={client.id}
      className='flex flex-col justify-between min-w-min text-center border p-8 rounded-sm'
    >
      <div className='relative'>
        <div
          className='absolute -top-6 -right-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer'
          onClick={() => fetcher()}
        >
          <Image
            src={'/images/close.svg'}
            width={28}
            height={28}
            alt='close icon'
          />
        </div>
      </div>
      <h3 className='text-lg font-semibold'>{client.clientName}</h3>

      <Link href={`/dashboard/client/${client.id}`}>
        <Button
          buttonText='View Invoice'
          type='button'
          customStyle='!bg-none !border !text-slate-400 !text-sm !tracking-wide !mt-4 !py-2 !px-6 !font-normal !hover:bg-none hover:border-blue-400 hover:hue-rotate-0 '
        />
      </Link>
    </div>
  );
}
