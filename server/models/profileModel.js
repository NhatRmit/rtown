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
    community: [
        {
            communityId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'community'            
            },
        }
    ],
})

module.exports = mongoose.model('profileStudent', profileStudentSchema)