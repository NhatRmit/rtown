const express = require('express');
const connectDB = require('./configs/database');
const cors = require('cors')
const app = express();
const path = require('path');
require('dotenv').config();
connectDB();

app.use(cors())
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/users', require('./routes/api/userRoute'))
app.use('/api/posts', require('./routes/api/postRoute'))
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/profiles', require('./routes/api/profileRoute'))
app.use('/api/communities', require('./routes/api/communityRoute'))
app.use('/api/items', require('./routes/api/itemRoute'))
app.use('/api/messengers', require('./routes/api/messengerRoute'))
app.use('/api/images', require('./routes/api/imageRoute'))
app.use('/api/admins', require('./routes/api/adminRoute'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
const port = process.env.PORT;
let io = require('socket.io')(
    app.listen(port, () =>
        console.log(`Server started on port ${port}`)), {

    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

let users = [];
const addUser = (userId, socketId, userInfo) => {
    const checkUser = users.some(u => u.userId === userId);

    if (!checkUser) {
        users.push({ userId, socketId, userInfo });
    }
}

const findFriend = (id) => {
    return users.find(u => u.userId === id);
}

io.on('connection', (socket) => {
    console.log('Socket is connecting...')
    socket.on('addUser', (userId, userInfo) => {
        addUser(userId, socket.id, userInfo);
        io.emit('getUser', users);

        const us = users.filter(u => u.userId !== userId);
        const con = 'new_user_add';
        for (var i = 0; i < us.length; i++) {
            socket.to(us[i].socketId).emit('new_user_add', con);
        }
    });

    socket.on('sendMessage', (data) => {
        const user = findFriend(data.receiverId);

        if (user !== undefined) {
            socket.to(user.socketId).emit('getMessage', data)
        }
    })

    socket.on('messageSeen', msg => {
        const user = findFriend(msg.senderId);
        if (user !== undefined) {
            socket.to(user.socketId).emit('msgSeenResponse', msg)
        }
    })

    socket.on('delivaredMessage', msg => {
        const user = findFriend(msg.senderId);
        if (user !== undefined) {
            socket.to(user.socketId).emit('msgDelivaredResponse', msg)
        }
    })
    socket.on('seen', data => {
        const user = findFriend(data.senderId);
        if (user !== undefined) {
            socket.to(user.socketId).emit('seenSuccess', data)
        }
    })

    socket.on('typingMessage', (data) => {
        const user = findFriend(data.receiverId);
        if (user !== undefined) {
            socket.to(user.socketId).emit('typingMessageGet', {
                senderId: data.senderId,
                receiverId: data.receiverId,
                msg: data.msg

            })
        }
    })
})

// serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static('client/build'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     })
// }

