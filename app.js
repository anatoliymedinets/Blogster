const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session');
const cors = require('cors')
const passport = require('passport')
const keys = require('./config/keys');
const requireLogin = require('./middlewares/requireLogin');

require('./services/passport');

const app = express()

require('./services/cache')

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

const authRouter = require('./routes/authRoutes')
const blogRouter = require('./routes/blogRoutes')

app.use('/api/auth', authRouter)
app.use('/api/blogs', requireLogin, blogRouter)

module.exports = app