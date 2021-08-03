const express = require("express")

const app = express()

//view engine
app.set('view engine', 'ejs')

//send home page
app.get('/', (req, res)=>{
    res.render('index')
})
//send about page
app.get('/about', (req, res)=>{
    res.render('about')
})
app.get('/blogs/create', (req, res) => {
    res.render('create')
})
//404 page
app.use((req, res) => {
    res.status(404).render('404')
})
//app listen
app.listen(process.env.PORT || 3000, () => {
    console.log('Server running')
})

