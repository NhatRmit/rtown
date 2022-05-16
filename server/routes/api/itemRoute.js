const express = require('express')
const router = express.Router()
const { item } = require('../../controllers/itemController')
const upload = require('../../middlewares/uploadMiddleware')

const { auth } = require('../../middlewares/authMiddleware')

router.post('/', upload.single("file"), auth, item.createItem)

router.get('/', item.getItems)
router.get('/myItem', auth, item.getItemByProfile)
router.get('/:item_id', auth.apply, item.getItemById)
router.put('/update/:item_id', upload.single("file"), auth, item.updateItem)
router.delete('/delete/:item_id', auth, item.deleteItem)
router.put('/buy/:item_id', auth, item.buyItem)
router.put('/used/:item_id', auth, item.usedItem)





module.exports = router