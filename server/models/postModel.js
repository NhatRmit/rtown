const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
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
    image: {
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
    downvotes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
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
            image: {
                type: String, 
                default: ''
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

module.exports = mongoose.model('Post', postSchema)