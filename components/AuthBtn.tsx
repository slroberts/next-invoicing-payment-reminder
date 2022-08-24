import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import router from 'next/router';
import Button from './Button';

const AuthBtn = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/');
  }

  return (
    <div className='flex items-center gap-4'>
      <figure className='mt-1'>
        <Image
          src={session?.user?.image as 'string'}
          alt={session?.user?.name as 'string'}
          width={40}
          height={40}
          className='rounded-full'
        />
      </figure>
      <p className='hidden md:block'>{session?.user?.name}</p>
      <Button
        buttonText='Sign out'
        type='button'
        customStyle='bg-none border text-slate-400 py-2 px-8 font-normal hover:border-blue-400 hover:bg-none hover:hue-rotate-0 hover:shadow-md'
        onClick={() => signOut()}
      />
    </div>
  );
};

export default AuthBtn;
