const express = require("express")
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const app = express()

//database connection
mongoose.connect('mongodb://localhost:27017/bloggr',
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 3000, () => {
        console.log('Server running')
    }))
    .catch((err) => console.log(err))

//view engine
app.set('view engine', 'ejs')

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: "Sunk cost fallacy",
        snippet: "Lorem ipsum dolor sit amet",
        body: "consectetur adipiscing elit. Quisque sapien velit, aliquet eget commodo nec, auctor a sapien. Nam eu neque vulputate diam rhoncus faucibus. Curabitur quis varius libero. Lorem"
    })
    blog.save()
        .then((result)=> {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
// middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'))
//send home page
app.get('/', (req, res)=>{
    res.redirect('/blogs')
    res.render('index', {title: 'Home', blogs })
})

//send about page
app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'})
})
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create new Blog'})
})
//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error: 404'})
})