const Blog = require('../models/Blog')

const blog_index = async (req, res) => {
  try{
    let blogs = await Blog.find().sort({createdAt: -1})
    res.render('index', {title: 'All blogs', blogs})
  } catch (err) {
    console.log(err)
  }
}

const blog_details = async (req, res) => {
  const id = req.params.id
  try{
    let blog = await Blog.findById(id)
    res.render('details' , {title: 'Blog details', blog})
  } catch (err) {
    console.log(err)
  }
}

const blog_create_get = (req, res) => {
  res.render('create', {title: 'New Blog'})
}
const blog_create_post = async (req, res) => {
  const blog = new Blog(req.body)
  try{
    await blog.save()
    console.log('Blog added')
    res.redirect('/blogs')
  } catch (err){
    console.log(err)
  }
}

const blog_delete = async (req, res) => {
  const id = req.params.id
  try{
    await Blog.findByIdAndDelete(id)
    res.json({redirect: '/blogs'})
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
}