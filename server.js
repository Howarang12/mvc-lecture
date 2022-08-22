const express = require('express')
const app = express()

const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
require('dotenv').config()

const DB_STRING = process.env.DB_STRING
mongoose.connect(DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    console.log('connected to db...')
    app.listen(3000, () => console.log('server running... '))
  })
  .catch((err) => console.log(err))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

//fix css loading
app.get('/blogs/css/style.css', (req, res) => {
  res.redirect('/css/style.css')
})

app.get('/', (req, res) => {
  res.redirect('/blogs')
})



app.get('/blogs', async (req, res) => {
  let blogs = await Blog.find().sort({createdAt: -1})
  res.render('index', {title: 'All blogs', blogs})

})

app.post('/blogs', async (req, res) => {
  const blog = new Blog(req.body)
  try{
    await blog.save()
    console.log('Blog added')
    res.redirect('/blogs')
  } catch (err){
    console.log(err)
  }
  
})

app.get('/blogs/:id', async (req, res) => {
  const id = req.params.id
  try{
    let blog = await Blog.findById(id)
    res.render('details' , {title: 'Blog details', blog})
  } catch (err) {
    console.log(err)
  }
  
})

app.delete('/blogs/:id', async (req, res) => {
  const id = req.params.id
  try{
    await Blog.findByIdAndDelete(id)
    res.json({redirect: '/blogs'})
  } catch (err) {
    console.log(err)
  }
})

app.get('/model', (req, res) => {
  res.render('model', {title: 'Model'})
})

app.get('/view', (req, res) => {
  res.render('view', {title: 'View'})
})

app.get('/controller', (req, res) => {
  res.render('controller', {title: 'Controller'})
})

app.get('/create', (req, res) => {
  res.render('create', {title: 'New Blog'})
})

app.use((req, res) => {
  res.status(404).render('404', {title: '404'})
})