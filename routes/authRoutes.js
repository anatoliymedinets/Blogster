const express = require('express')
const passport = require('passport');
const controller = require('../controllers/auth')

const router = express.Router()

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/callback', 
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('http://localhost:4200/blogs');
  }
)

router.get('/logout', controller.logout)
router.get('/current_user', controller.currentUser)

module.exports = router
