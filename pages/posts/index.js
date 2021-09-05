
import Head from 'next/head';
import Title from '../../components/Title';
import NewPosts from '../../components/NewPosts';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Taytrongbantay - Bài đăng</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <div className="md:grid grid-cols-3 gap-4">
        <div className="">
            <p>Left grid</p>
        </div>

        <div className="col-span-2 shadow-md ring-1 ring-green-200">
          <NewPosts />
        </div>
        </div>
      </main>
    </div>
  )
}