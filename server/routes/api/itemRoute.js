const express = require('express')
const router = express.Router()
const {getItems,createItem} = require('../../controllers/itemController')

const {auth} = require('../../middlewares/authMiddleware')

router.get('/', getItems)

router.post('/', createItem)


module.exports = router