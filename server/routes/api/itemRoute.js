const express = require('express')
const router = express.Router()
const { item } = require('../../controllers/itemController')

const { auth } = require('../../middlewares/authMiddleware')

router.post('/', auth, item.createItem)

router.get('/', item.getItems)
router.get('/myItem', auth, item.getItemByProfile)

router.put('/buy/:item_id', auth, item.buyItem)
router.put('/used/:item_id', auth, item.usedItem)

module.exports = router