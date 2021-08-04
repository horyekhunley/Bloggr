const express = require("express")
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

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
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

//blog routes
app.use('/blogs', blogRoutes)

//send home page
app.get('/', (req, res)=>{
    res.redirect('/blogs')
    res.render('index', {title: 'Home', blogs })
})

//send about page
app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'})
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Error: 404'})
})