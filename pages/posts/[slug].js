import axios from 'axios';
import Head from 'next/head';
import { Markup } from 'interweave';
import Image from 'next/image'

export default function SinglePost({ data }) {
  var { title, content, author } = data

  return (
    <div>
      <Head>
        <title>{title} - Taytrongbantay</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <div className="p-2 bg-green-100 text-center text-xl">
            { title }
        </div>
        <div className="ck-content container shadow-md p-2">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col divide-y-2 divide-yellow-500">
            <Image alt={"Ảnh của " + author.username} src={author.avatar} className="rounded m-5 shadow-xl"></Image>
            <h3 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-red-600">
              {author.username}
            </h3>
          </div>
          <div className="col-span-3 p-5 mt-4 ring-1 ring-gray-400 rounded">
          { <Markup content={content} allowElements={true} allowAttributes={true} /> }
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}


export async function getServerSideProps(context) {
    const { slug } = context.params;

    // Fetch data from external API
    const res = await axios.get(`${process.env.baseUrl}/api/posts/${slug}`);
    const data = res.data

    console.log(data)
  
    // Pass data to the page via props
    return { props: { data } }
  }
  