import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '../components/Button';
import Layout from '../components/Layout';
import useForm from '../utils/useForm';

const Login: NextPage = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const { formValues, handleInputChange, handleSubmit } = useForm(initialState);
  const { email, password } = formValues;

  return (
    <Layout>
      <section>
        <h1 className='font-semibold uppercase text-gray-400 antialiased mb-6 text-center'>
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className='max-w-xl sm:max-w-sm mx-auto h-96 flex flex-col gap-6 p-8 bg-white shadow-xl shadow-blue-50 rounded border border-blue-50'
          method='post'
        >
          <div>
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
          <div>
            <label className='font-medium' htmlFor='password'>
              Password
            </label>
            <input
              className='mt-2 border w-full p-3 border-blue-100 rounded'
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button buttonText='Login' customStyle='w-full' type='submit' />
          </div>
          <article className='text-center text-sm'>
            <span>Don&lsquo;t have an account? </span>
            <Link href='/register'>
              <a className='underline underline-offset-2 font-medium'>
                Create account
              </a>
            </Link>
          </article>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
