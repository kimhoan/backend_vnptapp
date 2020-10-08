const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//import VALIDATE
const { registerValidation, loginValidation } = require('../validate/validate');

//Nhập form từ model user
const User = require("../model/User");
const { use } = require('./posts');


// REGISTER #####-----------------------------------########################
router.post('/register', async (req, res) => {

    // VALIDATE USER + REPORT BUG TO FRONT END. 
    const { error } = registerValidation(req.body);
    //log err backend
    //console.log('mes', error.details[0].message)
    if (error && error.details[0]) {
        //send err to frontend
        return res.status(400).send(error.details[0].message)
    }
    //Check user trước khi lưu database
    const emailExist = await User.findOne({ email: req.body.email })
    //Check email đã tồn tại
    if (emailExist) {
        return res.status(400).send("Email đã tồn tại");
    }
    //Hash Password (mã hóa mật khẩu gửi lên gửi về.)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        // password: req.body.password,
    })
    try {
        // lưu user
        const savedUser = await user.save();
        // res.send(savedUser);
        res.send({ user: user._id, userEmail: user.email, userName: user.name, message: 'Đăng kí thành công' });
    } catch (err) {
        res.status(400).send(err)
    }
})
//LOGIN ####--------------------------##############

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error && error.details[0]) {
        return res.status(400).send(error.details[0].message)
    }
    //check nếu đã tồn tại email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send({ err: "Email or mật khẩu không chính xác" });
    }
    //Password đúng khi password gửi lên = user.password đã lưu
    const validPass = await bcrypt.compare(req.body.password, user.password)
    // nếu ko có pass hợp lệ
    if (!validPass) {
        return res.status(400).send({ err: "Email or mật khẩu không chính xác" });
    }
    //khởi tạo token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    return res.status(200).send({ userEmail: user.email, userName: user.name, token, userId: user._id })
})

router.get("/", (req, res) => {
    User.find().then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
    })
})


module.exports = router;