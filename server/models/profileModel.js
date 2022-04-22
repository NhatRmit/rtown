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
    community: [
        {
            communityId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'community'            
            }, 
            communityName: {
                type: mongoose.Schema.Types.String,
                ref: 'community'
            }
        }
    ],
})

module.exports = mongoose.model('profileStudent', profileStudentSchema)