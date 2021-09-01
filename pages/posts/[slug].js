import axios from 'axios';
import Head from 'next/head';
import { Markup } from 'interweave';

export default function SinglePost({ data }) {
  var { title, content, author } = data

  return (
    <div>
      <Head>
        <title>Taytrongbantay - Posts</title>
        <meta name="description" content="Taytrongbantay" />
      </Head>

      <main>
        <div className="p-2 bg-yellow-200 text-center text-xl">
            { title }
        </div>
        <div className="ck-content container shadow-md p-2">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col divide-y-2 divide-yellow-500">
            <img src={author.avatar} className="rounded m-5 shadow-xl"></img>
            <h3 class="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-red-600">
              {author.username}
            </h3>
          </div>
          <div className="col-span-3">
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
    const res = await axios.get(`http://localhost:3000/api/posts/${slug}`);
    const data = res.data

    console.log(data)
  
    // Pass data to the page via props
    return { props: { data } }
  }
  