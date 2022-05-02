const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel');
const Message = require('../models/messengerModel');
const fs = require('fs');

const getLastMessage = asyncHandler(async (myId, fdId) => {
    const msg = await Message.findOne({
        $or: [{
            $and: [{
                senderId: {
                    $eq: myId
                }
            }, {
                reseverId: {
                    $eq: fdId
                }
            }]
        }, {
            $and: [{
                senderId: {
                    $eq: fdId
                }
            }, {
                reseverId: {
                    $eq: myId
                }
            }]
        }]

    }).sort({
        updatedAt: -1
    });
    return msg;
})

const getFriends = asyncHandler(async (req, res) => {
    const myId = req.myId;
    let fnd_msg = [];
    try {
        const friendGet = await Profile.find({
            _id: {
                $ne: myId
            }
        });
        for (let i = 0; i < friendGet.length; i++) {
            let lmsg = await getLastMessage(myId, friendGet[i].id);
            fnd_msg = [...fnd_msg, {
                fndInfo: friendGet[i],
                msgInfo: lmsg
            }]

        }

        // const filter = friendGet.filter(d=>d.id !== myId );
        res.status(200).json({ success: true, friends: fnd_msg })

    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: 'Internal Sever Error'
            }
        })
    }
})

const upMessDB = asyncHandler(async (req, res) => {
    const {
        senderName,
        reseverId,
        message
    } = req.body
    const senderId = req.myId;

    try {
        const insertMessage = await messageModel.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: {
                text: message,
                image: ''
            }
        })
        res.status(201).json({
            success: true,
            message: insertMessage
        })

    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: 'Internal Sever Error'
            }
        })
    }
})

const getMessage = asyncHandler(async (req, res) => {
    const myId = req.myId;
    const fdId = req.params.id;

    try {
        let getAllMessage = await Message.find({

            $or: [{
                $and: [{
                    senderId: {
                        $eq: myId
                    }
                }, {
                    reseverId: {
                        $eq: fdId
                    }
                }]
            }, {
                $and: [{
                    senderId: {
                        $eq: fdId
                    }
                }, {
                    reseverId: {
                        $eq: myId
                    }
                }]
            }]
        })

        // getAllMessage = getAllMessage.filter(m=>m.senderId === myId && m.reseverId === fdId || m.reseverId ===  myId && m.senderId === fdId );

        res.status(200).json({
            success: true,
            message: getAllMessage
        })

    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: 'Internal Server error'
            }
        })
    }
})

const seenMessage = asyncHandler(async (req, res) => {
    const messageId = req.body._id;

    await Message.findByIdAndUpdate(messageId, {
        status: 'seen'
    })
        .then(() => {
            res.status(200).json({
                success: true
            })
        }).catch(() => {
            res.status(500).json({
                error: {
                    errorMessage: 'Internal Server Error'
                }
            })
        })
})


const deliverMessage = asyncHandler(async (req, res) => {
    const messageId = req.body._id;

    await Message.findByIdAndUpdate(messageId, {
        status: 'delivered'
    })
        .then(() => {
            res.status(200).json({
                success: true
            })
        }).catch(() => {
            res.status(500).json({
                error: {
                    errorMessage: 'Internal Server Error'
                }
            })
        })
})

module.exports = {
    getFriends,
    upMessDB,
    getMessage,
    seenMessage,
    deliverMessage,
}