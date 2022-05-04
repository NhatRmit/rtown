const express = require('express')
const router = express.Router()
const {getItems,createItem, buyItem, usedItem, getItemByProfile} = require('../../controllers/itemController')

const {auth} = require('../../middlewares/authMiddleware')

router.get('/', getItems)
router.get('/myItem', auth, getItemByProfile)
router.post('/', createItem)
router.put('/buy/:item_id', auth, buyItem)
router.put('/used/:item_id', auth, usedItem)

module.exports = router