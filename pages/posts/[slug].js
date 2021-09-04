import axios from 'axios';
import Head from 'next/head';
import { Markup } from 'interweave';
import Image from 'next/image'
import Title from '../../components/Title';
import CommentForm from '../../components/posts/CommentForm';

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
        <div className="ck-content shadow-md p-2">
        <div className="md:grid grid-cols-6 gap-4">
        <div className="flex md:flex-col divide-y-reverse md:divide-y-2 divide-yellow-500">
            <img className="w-20 md:w-60 rounded shadow-xl" alt={"Ảnh của " + author.username} src={author.avatar} />

            <h3 className="flex-grow md:flex-grow-0 flex items-center flex-col justify-center text-center text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-red-600">
              <img className="inline-block" width="30" src="/images/level/50.png" alt="level 50"></img>
              {author.username} 
              <p className="text-xs">&lt;{author.status}&gt;</p>
            </h3>

          </div>
          <div className="col-span-5 p-5 mt-4 ring-1 ring-gray-400 rounded">
          { <Markup content={content} allowElements={true} allowAttributes={true} /> }
          </div>
        </div>
        </div>
      </main>

      {/* Comment section */}
      <Title>Bình luận</Title>
      <div className="Comment">
        <CommentForm />
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
    const { slug } = context.params;

    // Fetch data from external API
    const res = await axios.get(`${process.env.baseUrl}/api/posts/${slug}`);
    const data = res.data

    // Pass data to the page via props
    return { props: { data } }
  }
  