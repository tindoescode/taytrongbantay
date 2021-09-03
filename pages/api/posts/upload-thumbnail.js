import requireAuth from '../../../middleware/requireAuth'
import FormData from 'form-data'
import axios from 'axios'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      
      var path = null;
      const form = new formidable.IncomingForm();
      form.uploadDir = "./public/upload/";
      form.keepExtensions = true;

      form.parse(req, (err, fields, files) => {
        if(err) throw err;

        path = files.file.path;

        let data = new FormData();

        data.append('image', fs.createReadStream(path));
        data.append('album', 'wah8Tm3s9FxI091') //Mtlwn3U

        // console.log(data)
        var config = {
          method: 'post',
          url: 'https://api.imgur.com/3/image',
          headers: { 
            'Authorization': 'Client-ID 66c0f32e27effa9', 
            ...data.getHeaders()
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          // console.log(response.data);

          res.status(200).json(response.data)
        })
        .catch(function (error) {
          // console.log(error.code);

          res.status(200).json(error.data)
        })
        .finally(() => {
          // fs.unlinkSync(path)
        })
        
  
      });
    }
    catch(error) {
      console.log(error);
      res.status(200).json({error: error});
    }
  }
  else {
    res.status(200).json('not support');
  }
} 

// export default requireAuth(handler);
export default handler