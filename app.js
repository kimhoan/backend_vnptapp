const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors");
const app = express()
const dotenv = require("dotenv");
//middle
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cors());

dotenv.config();
//Connect to DB
//const url = "mongodb+srv://admin:kimhoan321@cluster0.ughun.mongodb.net/Testing?retryWrites=true&w=majority"
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("CONNECT DB")
})

//import Router
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const postTitleRoute = require('./routes/postTitle');
//Route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/title', postTitleRoute);




// const PostModel = require("./model/post")
// app.get("/login", (req, res) => {
//     res.send("Hi from server")
// })
// app.post("/login", (req, res) => {
//     if (req.body.username === 'kimhoan' && req.body.password === '123456') {
//         return res.status(200).send({
//             message: 'Successfully',
//             content: [{
//                 name: 'Kim Hoàn',
//                 id: '123456'
//             }]
//         })
//     }
//     else {
//         return res.status(400).send({
//             message: 'Error',
//             content: []
//         })
//     }
// })

app.listen(3000, '192.168.1.8')