import { store } from '@app/store';
import { EmptyLayout, MainLayout } from '@components/layout'
import '@styles/globals.scss';
import '@iconscout/unicons/css/line.css';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? EmptyLayout
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    )
  }
}

export default MyApp
