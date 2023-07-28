import PartnerModel from '../models/Partner.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = 'secret';

export const register = async (req, res) => {
    const { agentImage, email, firstName, lastName, password, companyName, phone, messanger, fullAddress } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await PartnerModel.create({
            agentImage,
            email,
            firstName,
            lastName,
            password: hash,
            companyName,
            phone,
            messanger,
            fullAddress,
            procent: ''
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

        const { password: hashedPassword, ...userData } = user.toObject();
        
        res.json({ ...userData, token });

    } catch (error) {
        console.error('Помилка реєстрації користувача:', error);
        res.status(500).json({ message: 'Не вдалося зареєструвати користувача' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await PartnerModel.findOne({email: req.body.email});

        if(!user) {
          console.log('uSER');
            return res.status(404).json({
                message: 'User not found',
            })
        }

        if(user.disabled) {
          console.log('disabled',user.disabled);
          return res.status(404).json({
              message: 'User disabled',
          })
      }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if(!isValidPass) {
          console.log('PASSWORD');
            return res.status(400).json({
                message: 'Password not found',
            })
        }

        const token = jwt.sign(
          { id: user._id, loggedIn: true },
          JWT_SECRET,
          { expiresIn: '30d' }
        );

        const {passwordDoc, ...userData} = user._doc

        await user.save();

        res.json({...userData, token})
    } catch(e) {
        console.log(e);
    }
}