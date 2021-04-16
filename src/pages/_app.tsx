import MainLayout from '@app/layouts/MainLayout';
import { NextComponentType, NextPageContext } from 'next';
import type { AppInitialProps } from 'next/app';

type AppProps = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, {}> & {
    noLayout?: boolean;
  };
};

function MyApp({ Component, pageProps }: AppProps) {
  if (Component.noLayout) return <Component {...pageProps} />;
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
