const mongoose = require('mongoose')

const profileStudentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    bio: {
        type: String
    },
    Rpoint: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
    },
    checkouts: [
        {
            event: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'post'
            }
        }
    ],
    itemList: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'item'
            },
        }
    ],
    community: [
        {
            communityId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'community'
            },
        }
    ],
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('profileStudent', profileStudentSchema)