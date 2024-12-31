import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Import global CSS (optional)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

