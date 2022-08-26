import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import SessionContext from '../components/SessionContext';
import { useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loginSession, setLoginSession] = useState();
  const [loginStatus, setLoginStatus] = useState();
  return (
    <SessionProvider session={session}>
      <SessionContext.Provider
        value={{ loginSession, setLoginSession, loginStatus, setLoginStatus }}
      >
        <Component {...pageProps} />
      </SessionContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
