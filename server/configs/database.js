const mongoose = require('mongoose');

//Connect to database
const connectDB = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };
        const conn = await mongoose.connect(process.env.MONGO_URI, connectionParams)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;


