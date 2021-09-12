// import '../styles/global.css'
import GlobalStyles from "../styles/GlobalStyles";
import "../styles/ckeditor.css";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { useStore } from "../store";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
