import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import NewPosts from "../components/NewPosts";
import { useEffect, useState } from "react";
import FacebookLoading from "../components/FacebookLoading";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  let [categories, setCats] = useState();

  useEffect(() => {
    // setTimeout(() => {

    // }, 30000)
    axios.get("/api/category/").then((res) => {
      setCats(res.data);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Tay trong bàn tay - Trang chủ</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <div className="md:grid grid-cols-3 gap-4">
          <div className="rounded-md shadow-sm">
            <div className="bg-gray-100 round-md shadow-md hover:shadow-xl transition ease-in-out duration-300">
              <h2 className="text-xl p-2">Chuyên mục</h2>
              {categories &&
                categories.map((category) => {
                  return (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug}`}
                    >
                      <a>
                        <div className="p-2 hover:bg-gray-600 hover:text-white transition">
                          {category.name}
                        </div>
                      </a>
                    </Link>
                  );
                })}

              {!categories && <Skeleton count={3} height={50}/>}
            </div>

            <div className="bg-gray-100 round-md shadow-md my-3 hover:shadow-xl transition ease-in-out duration-300">
              <h2 className="text-xl p-2">Phím tắt</h2>
              <Link href="/admin">
                <a>
                  <div className="p-2 hover:bg-gray-600 hover:text-white transition">
                    Quản lý chuyên mục
                  </div>
                </a>
              </Link>
              <Link href="/posts/create">
                <a>
                  <div className="p-2 hover:bg-gray-600 hover:text-white transition">
                    Đăng bài
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="rounded-md shadow-sm col-span-2">
            <NewPosts />
          </div>
        </div>
      </main>
    </div>
  );
}
