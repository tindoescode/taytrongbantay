import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import { useStore } from '../store'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  
  return <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider> 
}

export default MyApp
