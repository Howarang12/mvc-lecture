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
app.use(morgan('dev'))


app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/blogs', async (req, res) => {
  let blogs = await Blog.find().sort({createdAt: -1})
  res.render('index', {title: 'All blogs', blogs})

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

app.use((req, res) => {
  res.status(404).render('404', {title: '404'})
})