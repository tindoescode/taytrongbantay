import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import PostCard from '../components/PostCard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>
      
      <main className={styles.main}>
      <div className="md:grid grid-cols-3 gap-4">
      <div className="rounded-md shadow-sm">

      <div className="bg-gray-100 round-md shadow-md hover:shadow-xl transition ease-in-out duration-300">
        <h2 className="text-xl p-2">Chuyên mục</h2>
        <div className="p-2 hover:bg-gray-600 hover:text-white transition"><Link href=""><a>Lời Chúa mỗi ngày</a></Link></div>
        <div className="p-2 hover:bg-gray-600 hover:text-white transition"><Link href=""><a>Sự kiện</a></Link></div>
      </div>

      <div className="bg-gray-100 round-md shadow-md my-3 hover:shadow-xl transition ease-in-out duration-300">
        <h2 className="text-xl p-2">Phím tắt</h2>
        <Link href=""><a><div className="p-2 hover:bg-gray-600 hover:text-white transition">Quản lý chuyên mục</div></a></Link>
        <Link href="/posts/new-post"><a><div className="p-2 hover:bg-gray-600 hover:text-white transition">Đăng bài nhanh</div></a></Link>
      </div>

      </div>
      <div className="bg-green-500 rounded-md shadow-sm col-span-2">
        <PostCard />
        <PostCard />
      </div>

      </div>

      </main>
    </div>
  )
}
