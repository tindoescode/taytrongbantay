// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../middleware/mongodb';
import bcrypt from '../../middleware/bcrypt';
import User from '../../models/user';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Check if name, email or password is provided
    const { username, name, email, password, gender } = req.body;

    if (username && name && email && password && gender) {
        try {
          // Hash password to store it in DB
          var passwordhash = await bcrypt.sign(password);

          // Create new user
          var user = await User.create({
            name,
            username,
            email,
            password: passwordhash,
            gender,
            avatar: gender == 'male' ? 'https://i.imgur.com/b51E0eg.jpg' : 'https://i.imgur.com/StTiSj8.jpg'
          });

          console.log(`[NEW USER] User ${name} created.`);
          return res.status(200).send(user);
        } catch (error) {
          // Handle error when field duplicate

          console.log(error.message);
          return res.status(200).send(error);
        }
      } else {
        res.status(422).send({error: 'data_incomplete'});
      }
  } else {
    res.status(422).send({error: 'req_method_not_supported'});
  }
};

export default connectDB(handler);