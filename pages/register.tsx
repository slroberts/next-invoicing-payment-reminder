import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '../components/Button';
import Layout from '../components/Layout';
import useForm from '../utils/useForm';

const CreateAccount: NextPage = () => {
  const initialState = {
    email: '',
    password: '',
    name: '',
  };
  const { formValues, handleInputChange, handleSubmit } = useForm(initialState);
  const { email, password, name } = formValues;

  return (
    <Layout>
      <section>
        <h1 className='font-semibold uppercase text-gray-400 antialiased mb-6 text-center'>
          Create your account
        </h1>
        <form
          onSubmit={handleSubmit}
          className='max-w-xl sm:max-w-xl mx-auto h-auto flex flex-wrap gap-6 p-8 bg-white shadow-xl shadow-blue-50 rounded border border-blue-50'
          method='post'
        >
          <div className='w-full sm:flex-1'>
            <label className='font-medium' htmlFor='email'>
              Email
            </label>
            <input
              className='mt-2 border w-full p-3 border-blue-100 rounded'
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className='w-full sm:flex-1'>
            <label className='font-medium' htmlFor='email'>
              Full Name
            </label>
            <input
              className='mt-2 border w-full p-3 border-blue-100 rounded'
              id='name'
              type='text'
              name='name'
              value={name}
              onChange={handleInputChange}
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
              pattern='[a-z0-9]{1,15}'
              title='Password should be digits (0 to 9) or alphabets (a to z).'
              value={password}
              onChange={handleInputChange}
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
