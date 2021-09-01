import React, { useState, useEffect, useRef } from 'react';
import convertToSlug from '../../utils/convertToSlug';

export default function NewPost () {
  const editorRef = useRef();
  const titleRef = useRef();
  const [slug, setSlug] = useState('');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, InlineEditor } = editorRef.current || {};
  
  useEffect(() => {
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

  const onSlugChange = (e) => {
    setSlug(e.target.value);
  }

  return <>
  <div className="flex flex-col">
    <label htmlFor="title" className="p-2 bg-green-400 text-white font-bold">Tiêu đề</label>
    <input onChange={onTitleChange} id="title" ref={titleRef} className="w-full p-3 border border-green-400 block mb-2" type="text" placeholder="Tiêu đề"></input>
  </div>

  <div className="flex flex-col">
    <label htmlFor="slug" className="p-2 bg-green-400 text-white font-bold">Đường dẫn (slug)</label>
    <input value={slug} id="slug" onChange={onSlugChange} className="p-3 border border-green-400 block mb-2" type="text" placeholder="Đường dẫn"></input>
  </div>

  <div className="flex flex-col">
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
                resizeOptions :  [
                    {
                        name :  'resizeImage: original' ,
                        value :  null ,
                        icon :  'original'
                    } ,
                    {
                        name :  'resizeImage: 25' ,
                        value :  '25',
                        icon :  'small'
                    },
                    {
                        name :  'resizeImage: 50' ,
                        value :  '50' ,
                        icon :  'medium'
                    } ,
                    {
                        name :  'resizeImage: 75' ,
                        value :  '75',
                        icon :  'large'
                    }
                ] ,
                toolbar: [
                    'imageStyle:full',
                    'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                    '|',
                    'imageTextAlternative',
                    '|',
                    'resizeImage: 25',
                    'resizeImage: 50' ,
                    'resizeImage: 75',
                    'resizeImage: original' ,
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
            htmlEmbed: {
                showPreviews: true
            },
            // This value must be kept in sync with the language defined in webpack.config.js.
            language: 'vn'
        }}  
      onReady={editor => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor)
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        console.log({ event, editor, data })
      }}
    />
  ) : (
    <div>Editor loading</div>  
  )
  }
  </div>
    <div className="flex justify-end">
        <button 
            className="p-4 bg-green-300 text-white mt-3 hover:bg-green-500 transition ease-in"
            onClick={() => {}}
            >
            Đăng bài
        </button>
    </div>
  </>
}
