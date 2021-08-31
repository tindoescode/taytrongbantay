import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>
      
      <header>
        <Header />
      </header>

      <main className={styles.main}>
        <div className="container mx-auto px-4">
          <h2>Hello world</h2>
        </div>
      </main>
    </div>
  )
}
