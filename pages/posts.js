import Head from 'next/head';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Title from '../components/Title';
import axios from 'axios';

export default function Home() {
  let [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get('/api/posts/').then(res => {
      console.log(res.data);
      setPosts(res.data);
    }).catch(err => console.log(err));
  }, [])

  return (
    <div>
      <Head>
        <title>Taytrongbantay - Bài đăng</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <div className="md:grid grid-cols-3 gap-4">
        <div className="">

        </div>

        <div className="col-span-2 shadow-md ring-1 ring-green-200">
          <Title style="purple">Bài mới</Title>
          {posts.map((post, index) => {
            return <PostCard thumbnail={post.thumbnail} key={index} href={process.env.baseUrl + '/posts/' + post.slug} title={post.title} description={post.description} />
          })}
        </div>
        </div>
      </main>
    </div>
  )
}
