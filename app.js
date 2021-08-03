const express = require("express")
const morgan = require('morgan')
const mongoose = require('mongoose');

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

// middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'))
//send home page
app.get('/', (req, res)=>{
    const blogs = [
        // {title: "Sunk cost fallacy", snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien velit, aliquet eget commodo nec, auctor a sapien. Nam eu neque vulputate diam rhoncus faucibus. Curabitur quis varius libero. Lorem.'},
        // {title: "Confirmation bias", snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien velit, aliquet eget commodo nec, auctor a sapien. Nam eu neque vulputate diam rhoncus faucibus. Curabitur quis varius libero. Lorem.'},
        // {title: "How to build web apps with node and express", snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sapien velit, aliquet eget commodo nec, auctor a sapien. Nam eu neque vulputate diam rhoncus faucibus. Curabitur quis varius libero. Lorem.'},

    ]
    res.render('index', {title: 'Home', blogs })
})

//send about page
app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'})
})
app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create new Blog'})
})
//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error: 404'})
})
//app listen


