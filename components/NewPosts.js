import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Title from '../components/Title';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

export default function NewPosts() {
  let [posts, setPosts] = useState();
  
  useEffect(() => {
    setTimeout(() => {
      axios.get('/api/posts/').then(res => {
        setPosts(res.data);
      }).catch(err => console.log(err));
    }, 300);

  }, [])

  return (<div className="col-span-2 shadow-md ring-1 ring-green-200 bg-gray-100" style={{minHeight: '200px'}}>
        <Title>Bài mới</Title>
        <div className="p-2">
          {posts && posts.map((post, index) => {
            return <PostCard thumbnail={post.thumbnail} key={index} href={'/posts/' + post.slug} title={post.title} description={post.description} />
          })}
          {!posts && 
          
            <Skeleton count={3} height={150} />
          
          }
        </div>

    </div>
  )
}
