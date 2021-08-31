import connectDB from '../../middleware/mongodb';
import bcrypt from '../../middleware/bcrypt';
import User from '../../models/user';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
        const { username, password } = req.body;

        if(!(username && password)) throw { error: 'Please fill in the username and password' }

        const user = await User.findOne({ username: username }).lean();
    
        if(!user) {
            throw { message: 'User not found' }
        }

        if(!await bcrypt.compare(password, user.password)) throw { message: 'Password is incorrect' }
        
        // Login successfully
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        console.log(`[Login] ${user.username} logged in successfully`);
        
        return res.status(200).json({status: 'ok', token});
    }

    catch(error) {
        res.status(500).json({error: error.message})
    }

  }
}

export default connectDB(handler);