const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    rpoint: {
        type: Number,
        required: true,
        default: 0,
    },
    name: {
        type: String
    },
    poster: {
        type: String
    },
    upvotes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    upvotesCount: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'

            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    commentsCount:{
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// postSchema.virtual('commentCount').get(function () {
//     return this.comments.length;
// })

module.exports = mongoose.model('event', eventSchema)