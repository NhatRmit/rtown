const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel')
const Profile = require('../models/profileModel');

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
        if (req.file === undefined) return res.send("you must select a file.");
        const imgUrl = `http://localhost:8000/api/images/${req.file.filename}`;
        const newItem = new Item({
            name: req.body.name,
            Rpoint: req.body.Rpoint,
            image: imgUrl,
        })

        const item = await newItem.save()
        res.json(item)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const buyItem = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })
    const item = await Item.findOne({ _id: req.params.item_id })
    try {
        profile.Rpoint -= item.Rpoint
        profile.itemList.unshift({
            item: req.params.item_id,
            itemName: item.name
        })
        await profile.save()
        res.status(200).json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const usedItem = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })
    const item = await Item.findOne({ _id: req.params.item_id })
    try {
        const removeItemIndex = item.itemList
            .map(item => item.id)
            .indexOf(req.params.item_id)

        profile.itemList.splice(removeItemIndex, 1)
        await profile.save()
        res.status(200).json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

const getItemByProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const items = profile.itemList.map(item => item)
        res.json(items)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const deleteItem = asyncHandler(async (req, res) => {
    try {
        const item = await Item.findById(req.params.item_id)
        await item.remove()

        res.status(200).json({ msg: "delete item successfully!" })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
})

const item = {
    getItems,
    createItem,
    buyItem,
    usedItem,
    getItemByProfile,
    deleteItem,
}

module.exports = { item }