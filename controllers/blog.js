const Blog = require("../models/Blog")

module.exports.getAll = async (req, res) => {
  const blogs = await Blog.find().cache({ key: req.user.id })

  res.send(blogs)
}

module.exports.create = async (req, res) => {
  const { title, content } = req.body

  const blog = new Blog({
    title,
    content,
    _user: req.user.id
  })

  try {
    await blog.save()
    res.status(200).send(blog)
  } catch(err) {
    res.status(500).send(err)
  }
}