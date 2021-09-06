import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Title from "../../components/Title";
import ContentWrapper from "../../components/ContentWrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CategoryView() {
  let [category, setCategory] = useState(null);
  let [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      const { slug } = router.query;

      // Fetch category info
      axios.get(`/api/category/${slug}`).then((res) => {
        const { data } = res;
        setCategory(data[0]);
      });

      // Fetch posts info
      axios.get(`/api/posts?category=${slug}`).then((res) => {
        const { data } = res;
        console.log(data);
        setPosts(data);
      });
    }
  }, [router.query]);

  if (!category || !posts) return <p>Loading..</p>;
  return (
    <div>
      <Head>
        <title>{category?.name} - Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <div className="p-2 bg-green-100 text-center text-xl">
          {category?.name}
        </div>
        <ContentWrapper>
        {posts.map((post) => {
          return (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <div className="">{post.title}</div>
              </a>
            </Link>
          );
        })}
        </ContentWrapper>
      </main>
    </div>
  );
}
