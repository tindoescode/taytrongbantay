import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Taytrongbantay - Chào mừng</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
       <p className="text-center">Mừng cậu đã đăng nhập thành công! Bọn tớ rất vui được đón tiếp cậu.🥰😘
       <Link href="/"><a><h2 className="font-bold">Về trang chủ</h2></a></Link>
       
       </p>
      </main>
    </div>
  )
}
