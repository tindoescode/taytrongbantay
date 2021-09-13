import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import NewPosts from "../components/NewPosts";
import { useEffect } from "react";
import Title from "../components/Title";
import Skeleton from "react-loading-skeleton";
import tw, { styled } from "twin.macro";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  let categories = useSelector((state) => state.categories);
  let dispatch = useDispatch();

  useEffect(() => {
    if (!categories)
      axios.get("/api/category/").then((res) => {
        dispatch({ type: "LOAD_CATEGORIES", categories: res.data });
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Tay trong bàn tay - Trang chủ</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <div tw="md:grid grid-cols-3 gap-4">
          <div tw="rounded-md shadow-sm">
            <div tw="bg-gray-100 rounded shadow-md hover:shadow-xl transition ease-in-out duration-300">
              <h2 tw="text-xl p-2">Chuyên mục</h2>
              {categories &&
                categories.map((category) => {
                  return (
                    <Link
                      key={category._id}
                      href={`/category/${category.slug}`}
                    >
                      <a>
                        <div tw="p-2 hover:bg-gray-600 hover:text-white transition">
                          {category.name}
                        </div>
                      </a>
                    </Link>
                  );
                })}

              {!categories && (
                <div tw="p-2">
                  <Skeleton count={3} height={50} />
                </div>
              )}
            </div>

            <div tw="bg-gray-100 rounded shadow-md my-3 hover:shadow-xl transition ease-in-out duration-300">
              <h2 tw="text-xl p-2">Phím tắt</h2>
              <Link href="/admin">
                <a>
                  <div tw="p-2 hover:bg-gray-600 hover:text-white transition">
                    Quản lý chuyên mục
                  </div>
                </a>
              </Link>
              <Link href="/posts/create">
                <a>
                  <div tw="p-2 hover:bg-gray-600 hover:text-white transition">
                    Đăng bài
                  </div>
                </a>
              </Link>
            </div>
          </div>

          <div tw="col-span-2">
            <Title>Bài mới</Title>
            <div tw="rounded-md shadow-sm"></div>
            <NewPosts />
          </div>
        </div>
      </main>
    </div>
  );
}
