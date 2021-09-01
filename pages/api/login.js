import connectDB from '../../middleware/mongodb';
import bcrypt from '../../middleware/bcrypt';
import User from '../../models/user';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
        const { username, password } = req.body;

        if(!(username && password)) throw { error: 'Hãy nhập tên tài khoản và mật khẩu' }

        const user = await User.findOne({ username: username }).lean();
    
        if(!user) {
            throw { message: 'Nick name không tồn tại.' }
        }

        if(!await bcrypt.compare(password, user.password)) throw { message: 'Mật khẩu không chính xác' }
        
        // Login successfully
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        console.log(`[Login] ${user.username} đăng nhập thành công`);
        
        var result = {status: 'ok', token, user};

        delete result.user.password;
        
        return res.status(200).json(result);
    }

    catch(error) {
        res.status(200).json({error: error.message})
    }

  }
}

export default connectDB(handler);