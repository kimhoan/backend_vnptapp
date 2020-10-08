const router = require('express').Router();
const Post = require('../model/postTitle');
const { route } = require('./auth');
//const verifyToken = require('./verifytoken');

router.get("/get/:id", async (req, res) => {
    const user_id = req.params.id
    try {
        const posts = await Post.find({ user_id })
        res.status(200).send(posts);
    } catch (err) {
        res.status(500).send({ err })
    }
})

router.patch("/edit/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findByIdAndUpdate(_id, req.body)
        res.status(200).send({ post })
    }
    catch (err) {
        res.status(500).send({ err })
    }

})
//delete
router.delete("/delete/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findByIdAndDelete(_id)
        res.status(200).send({ post })
    }
    catch (err) {
        res.status(500).send({ err })
    }

})

module.exports = router;