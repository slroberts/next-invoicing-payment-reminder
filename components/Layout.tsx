import { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: ReactNode;
  title?: string;
};

export default function Layout({
  children,
  title = 'Invoicing Payment Reminder',
}: Props) {
  return (
    <div className=' bg-gradient-to-br from-white to-slate-50'>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content='Generate and send invoices, as well as send automated follow-up reminders about overdue payments.'
          key='desc'
        />
        <meta property='og:title' content='Invoicing Payment Reminder' />
        <meta
          property='og:description'
          content='Generate and send invoices, as well as send automated follow-up reminders about overdue payments.'
        />
        <meta name='robots' content='all' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='md:max-w-3xl lg:max-w-6xl mx-auto px-8 h-screen flex flex-col justify-between'>
        <Header />

        {children}

        <Footer />
      </main>
    </div>
  );
}
