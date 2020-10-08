const router = require('express').Router();
const verifyToken = require('./verifytoken');

//nhập form từ model post title

const Post = require("../model/postTitle");

router.post("/posttitle", verifyToken, async (req, res) => {
    //res.send('helo my post title');
    const post_title = new Post({
        user_id: req.body.user_id,
        title: req.body.title,
        data: req.body.data,
    })
    try {
        // lưu user
        const savedPostTitle = await post_title.save();
        // res.send(savedUser);
        res.send({ user_id: post_title._id, postTitle: post_title.title, postData: post_title.data, message: 'Submit thành công' });
    } catch (err) {
        res.status(400).send(err)
    }
})
module.exports = router;