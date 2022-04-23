const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel')
const getItems = asyncHandler(async (req, res) => {
    try {
        const items = await Item.find().sort({ Rpoint: -1 });
        res.status(200).json(items)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

const createItem = asyncHandler(async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            Rpoint: req.body.Rpoint
        })

        const item = await newItem.save()
        res.json(item)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

module.exports = {
    getItems,
    createItem,
}