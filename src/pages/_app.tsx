// pages/_app.tsx
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux';  // Asegúrate de que la ruta del store sea correcta
import '../components/globals.css';    // Importa estilos globales si los tienes

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
