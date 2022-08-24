import { NextPage } from 'next';
import AuthBtn from '../components/AuthBtn';
import Layout from '../components/Layout';
import Image from 'next/image';
import Button from '../components/Button';

const DashBoard: NextPage = () => {
  return (
    <Layout>
      <section>
        <div className='absolute top-16 md:top-4 md:right-8'>
          <AuthBtn />
        </div>
        <article className='-mt-10'>
          <h2 className='font-medium text-xl text-gray-400 antialiased mb-6 text-left'>
            Add Client To Generate Invoice
          </h2>
          <figure className='text-center opacity-20'>
            <Image
              src='/images/undraw_fill_in_mie5.svg'
              alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
              width={520}
              height={380}
              priority
            />
          </figure>
          <div className='text-center mt-8'>
            <Button type='button' buttonText='Add Client' />
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default DashBoard;
