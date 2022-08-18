import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '../components/Button';
import Layout from '../components/Layout';

const CreateAccount: NextPage = () => {
  return (
    <Layout>
      <section>
        <h1 className='font-semibold uppercase text-gray-400 antialiased mb-6 text-center'>
          Create your account
        </h1>
        <form className='max-w-xl sm:max-w-xl mx-auto h-auto flex flex-wrap gap-6 p-8 bg-white shadow-xl shadow-blue-50 rounded border border-blue-50'>
          <div className='w-full sm:flex-1'>
            <label className='font-medium' htmlFor='email'>
              Email
            </label>
            <input
              className='mt-2 border w-full p-3 border-blue-100 rounded'
              id='email'
              type='email'
              name='email'
            />
          </div>
          <div className='w-full sm:flex-1'>
            <label className='font-medium' htmlFor='email'>
              Full Name
            </label>
            <input
              className='mt-2 border w-full p-3 border-blue-100 rounded'
              id='email'
              type='email'
              name='email'
            />
          </div>
          <div className='w-full'>
            <label className='font-medium' htmlFor='password'>
              Password
            </label>
            <input
              className='mt-2 border w-full p-3 border-blue-100 rounded'
              id='password'
              type='password'
              name='password'
            />
          </div>
          <div className='w-full'>
            <Button
              buttonText='Create account'
              customStyle='w-full'
              type='submit'
            />
          </div>
          <article className='w-full text-center text-sm'>
            <span>Already have an account? </span>
            <Link href='/login'>
              <a className='underline underline-offset-2 font-medium'>Login</a>
            </Link>
          </article>
        </form>
      </section>
    </Layout>
  );
};

export default CreateAccount;
