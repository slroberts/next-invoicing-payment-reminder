import type { NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    router.push('/dashboard');
  }

  return (
    <Layout>
      <section className='flex flex-col lg:flex-row'>
        <article className='flex-1'>
          <h1 className='text-4xl md:text-6xl'>
            Invoicing &amp; Payment Reminder App
          </h1>
          <p className='mt-6 text-2xl text-slate-500 font-light tracking-wide'>
            Generate, send, and receive invoices, as well as send automated
            follow-up reminders about overdue payments.
          </p>

          <Button
            buttonText='Get Started - Sign in with Google'
            customStyle='my-8'
            type='button'
            onClick={() => signIn()}
          />
        </article>
        <figure>
          <Image
            src='/images/undraw_Receipt_re_fre3.svg'
            alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
            width={520}
            height={380}
            priority
          />
        </figure>
      </section>
    </Layout>
  );
};

export default Home;
