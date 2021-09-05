import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import convertToSlug from '../../utils/convertToSlug';
import Router from 'next/router';
import { Widget } from "@uploadcare/react-widget";
import { useSelector } from 'react-redux';

export default function NewPost() {
  const editorRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const [slug, setSlug] = useState('');
  const [description, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const { CKEditor, InlineEditor } = editorRef.current || { };
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(!user) {
      Router.push('/')
      return
    }
    
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      InlineEditor: require('../../ckeditor5-build-with-htmlembed-master')
    }
    setEditorLoaded(true)
  }, [])

  const onTitleChange = (e) => {
    setSlug(convertToSlug(e.target.value));
  }
  // Thumbnail upload handler
  const uploadToClient = (e) => {
    console.log(e)
    setThumbnail(e.originalUrl);
    setCreateObjectURL(URL.createObjectURL(e.originalUrl));
  }

  const onSlugChange = (e) => {
    setSlug(e.target.value);
  }

  const onPostSubmit = (e) => {
    e.preventDefault();

    let token = localStorage.getItem('token');
    let title = titleRef.current.value;
    let tags = 'none';

    axios.post('/api/posts/new-post', { content, title, tags, slug, thumbnail, description}, {
      headers: { 'Authorization': `Bearer ${token}` },
    }).then((res) => {
      if (res.data.title === title) {
        toast('Bài viết đã lên sóng🤗');

        Router.push(`/posts/${slug}`);
      }
      else {
        toast(`Lỗi: ${res.data.error}`)
      }
    })

  }

  return <>
    <div className="md:grid grid-cols-3 gap-4 mb-2">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="title" className="p-2 bg-green-400 text-white font-bold">Tiêu đề</label>
          <input onChange={onTitleChange} id="title" ref={titleRef} className="shadow w-full p-3 border border-green-400 block mb-2" type="text" placeholder="Tiêu đề"></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="slug" className="p-2 bg-green-400 text-white font-bold">Đường dẫn (slug)</label>
          <input value={slug} id="slug" onChange={onSlugChange} className="shadow p-3 border border-green-400 block mb-2" type="text" placeholder="Đường dẫn"></input>
        </div>

        <div className="flex flex-col">
          <label htmlFor="slug" className="p-2 bg-green-400 text-white font-bold">Thumbnail</label>
          <div className="shadow w-full p-3 border border-green-400 mb-2 flex flex-col items-center">
            <img src={createObjectURL} className="max-w-full rounded-xl p-2" />
            {/* <UploadInput onChange={uploadToClient} /> */}
            <Widget publicKey="533d4b8f6a11de77ba81" onChange={uploadToClient} clearable />
          </div>
        </div>

      </div>


      <div className="flex flex-col col-span-2">
        <label className="p-2 bg-green-400 text-white font-bold">Nội dung</label>
        {
          editorLoaded ? (
            <CKEditor
              editor={InlineEditor}
              data='<p>Xin chào bạn thân mến🥰😘😍!</p>'

              config={{
                toolbar: {
                  items: [
                    'removeformat',
                    '|',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'subscript',
                    'superscript',
                    'blockquote',
                    'specialcharacters',
                    '|',
                    'fontfamily',
                    'fontsize',
                    'fontcolor',
                    'fontbackgroundcolor',
                    'highlight',
                    '|',
                    'bulletedList',
                    'numberedList',
                    'todolist',
                    '|',
                    'alignment',
                    'outdent',
                    'indent',
                    '|',
                    'imageInsert',
                    'mediaembed',
                    'insertTable',
                    'tabletoolbar',
                    '|',
                    'htmlembed',
                    'link',
                    '|',
                    'horizontalline',
                    'pagebreak',
                    '|',
                    'findAndReplace',
                    'undo',
                    'redo'
                  ]
                },
                heading: {
                  options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' }
                  ]
                },
                image: {
                  styles: [
                    'alignLeft', 'alignCenter', 'alignRight'
                  ],
                  resizeOptions: [
                    {
                      name: 'resizeImage: original',
                      value: null,
                      icon: 'original'
                    },
                    {
                      name: 'resizeImage: 25',
                      value: '25',
                      icon: 'small'
                    },
                    {
                      name: 'resizeImage: 50',
                      value: '50',
                      icon: 'medium'
                    },
                    {
                      name: 'resizeImage: 75',
                      value: '75',
                      icon: 'large'
                    }
                  ],
                  toolbar: [
                    'imageStyle:full',
                    'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                    '|',
                    'imageTextAlternative',
                    '|',
                    'resizeImage: 25',
                    'resizeImage: 50',
                    'resizeImage: 75',
                    'resizeImage: original',
                  ]
                },
                fontSize: {
                  options: [
                    9,
                    10,
                    11,
                    12,
                    13,
                    'default',
                    16,
                    17,
                    19,
                    21
                  ]
                },
                table: {
                  contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells'
                  ]
                },
                // fontFamily: {
                //   options: [
                //       'default',
                //       'Ubuntu, Arial, sans-serif',
                //       'Ubuntu Mono, Courier New, Courier, monospace'
                //   ]
                // },
                htmlEmbed: {
                  showPreviews: true
                },
                // This value must be kept in sync with the language defined in webpack.config.js.
                language: 'vn'
              }}
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                // console.log('Editor is ready to use!', editor)
                const data = editor.getData()

                setContent(data);

                editor.editing.view.change((writer) => {
                  writer.setStyle(
                      "height",
                      "120px",
                      editor.editing.view.document.getRoot()
                  );
                })
              }}
              onChange={(event, editor) => {
                const data = editor.getData()

                setContent(data);
              }}
            />
          ) : (
            <p>Đang tải editor, đợi tí nhé.</p>
          )
        }

        <div className="flex flex-col">
          <label htmlFor="title" className="p-2 bg-green-400 text-white font-bold mt-4">Mô tả</label>
          <textarea 
            onChange={() => setDesc(descRef.current.value)} 
            ref={descRef} 
            className="shadow w-full p-3 border border-green-400 block mb-2" 
            type="text" 
            placeholder="Một sự việc abc những tưởng không ai quan tâm nhưng thật sự quan trọng..." 
            rows="4"></textarea>
        </div>
      </div>

      <div className="flex justify-end col-span-3">
        <button
          className="p-4 bg-green-500 text-white mt-3 hover:bg-green-700 transition ease-in rounded shadow-md"
          onClick={onPostSubmit}
        >
          Đăng bài
        </button>
      </div>
    </div>

  </>
}
