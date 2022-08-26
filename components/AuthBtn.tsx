import { signOut } from 'next-auth/react';
import Image from 'next/image';
import router from 'next/router';
import { useContext } from 'react';
import SessionContext from './SessionContext';
import Button from './Button';

export default function AuthBtn() {
  const { loginSession, loginStatus } = useContext(SessionContext);

  if (loginStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (loginStatus === 'unauthenticated') {
    router.push('/');
  }

  return (
    <div className='flex items-center gap-4'>
      <figure className='mt-1'>
        {loginSession?.user ? (
          <Image
            src={loginSession?.user?.image as 'string'}
            alt={loginSession?.user?.name as 'string'}
            width={40}
            height={40}
            className='rounded-full'
          />
        ) : null}
      </figure>
      <p className='hidden md:block'>{loginSession?.user?.name}</p>
      <Button
        buttonText='Sign out'
        type='button'
        customStyle='!bg-none !border !text-slate-400 !py-2 !px-8 !font-normal hover:border-blue-400 !hover:bg-none hover:hue-rotate-0 !hover:shadow-md'
        onClick={() => signOut()}
      />
    </div>
  );
}
