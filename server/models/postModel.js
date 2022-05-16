const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profileStudent'
    },
    text: {
        type: String,
        required: true
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
            avatar: {
                type: String
            },
            image: {
                type: String, 
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
    Rpoint: {
        type: Number,
        default: 0,
    },
    checkouts: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'community'
    }
})

// postSchema.virtual('commentCount').get(function () {
//     return this.comments.length;
// })

module.exports = mongoose.model('Post', postSchema)