import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import PostCard from '../components/PostCard'

export default function Home() {
  const posts = [
    {
      title: "BẢN TIN KHỐI THIẾU NIÊN QUÝ II/2021",
      description: "Đây là nơi cập nhật liên tục các hoạt động của Khối Thiếu Niên trong Quý II/2021, bao gồm các kì trại, chương trình huấn luyện, Thánh Kinh Hè Thiếu Niên và nhiều chương trình khác. Mời các anh chị cùng theo dõi!",
      thumbnail: "https://taytrongbantay.com/images/47"
    },
    {
      title: "THÁNH KINH HÈ THIẾU NIÊN 2021",
      description: "Trước tình hình dịch bệnh diễn biến phức tạp, ảnh hưởng không nhỏ đến sinh hoạt của Hội thánh Chúa tại Việt Nam, Khối Thiếu niên - Ủy ban Thanh Thiếu Nhi TLH cậy ơn Chúa triển khai khóa học Thánh Kinh Hè 2021 cho các em thiếu niên như sau:",
      thumbnail: "https://www.taytrongbantay.com/images/41"

    }
  ]

  return (
    <div>
      <Head>
        <title>Tay trong bàn tay - Trang chủ</title>
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
      <div className="bg-green-300 rounded-md shadow-sm col-span-2">
        {
          posts.map((post, index) => {
            return <PostCard key={index} title={post.title} description={post.description} thumbnail={post.thumbnail} />
          })
        }
      </div>

      </div>

      </main>
    </div>
  )
}
