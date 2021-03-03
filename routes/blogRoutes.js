const express = require('express')
const cleanHesh = require('../middlewares/cleanCache')
const controller = require('../controllers/blog')

const router = express.Router()

router.get('/', controller.getAll)
router.post('/', cleanHesh, controller.create)

module.exports = router