const mongoose = require('mongoose')

const communitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    communityName: {
        type: String,
        require: true,
    },
    public: {
        type: Boolean,
        default: true,
        require: true,
    },
    description: {
        type: String,
    },
    avatar: {
        type: String,
    },
    members: [
        {
            memberId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'       
            },
        }
        
    ],
    membersCount: {
        type: Number
    }
})

module.exports = mongoose.model('community', communitySchema)