const User = require('../models/userModel');
const Message = require('../models/messageModel');

const getLastMessage = async (myId, fdId) => {
     const msg = await Message.findOne({
          $or: [{
               $and: [{
                    senderId: {
                         $eq: myId
                    }
               }, {
                    receiverId: {
                         $eq: fdId
                    }
               }]
          }, {
               $and: [{
                    senderId: {
                         $eq: fdId
                    }
               }, {
                    receiverId: {
                         $eq: myId
                    }
               }]
          }]

     }).sort({
          updatedAt: -1
     });
     return msg;
}

const getFriends = async (req, res) => {
     let fnd_msg = [];
     try {
          const friendGet = await User.find({
               _id: {
                    $ne: req.user.id
               }
          });
          for (let i = 0; i < friendGet.length; i++) {
               let lmsg = await getLastMessage(req.user.id, friendGet[i].id);
               fnd_msg = [...fnd_msg, {
                    fndInfo: friendGet[i],
                    // msgInfo: lmsg
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
}

const messageUploadDB = async (req, res) => {
     const {
          senderName,
          receiverId,
          message
     } = req.body

     try {
          const insertMessage = await Message.create({
               senderId: req.user.id,
               senderName: senderName,
               receiverId: receiverId,
               message: {
                    text: message,
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
}

const messageGet = async (req, res) => {

     try {
          let getAllMessage = await Message.find({

               $or: [{
                    $and: [{
                         senderId: {
                              $eq: req.user.id
                         }
                    }, {
                         receiverId: {
                              $eq: req.params.id
                         }
                    }]
               }, {
                    $and: [{
                         senderId: {
                              $eq: req.params.id
                         }
                    }, {
                         receiverId: {
                              $eq: req.user.id
                         }
                    }]
               }]
          })

          getAllMessage = getAllMessage.filter(m => (m.senderId === req.user.id && m.receiverId === req.params.id) || (m.receiverId === req.user.id && m.senderId === req.params.id));

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

}


const deliveredMessage = async (req, res) => {
     const messageId = req.body._id;

     await Message.findByIdAndUpdate(messageId, {
          status: 'delivared'
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
}

module.exports = {
     getFriends,
     messageUploadDB,
     messageGet,
     deliveredMessage
}