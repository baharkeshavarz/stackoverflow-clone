import mongoose from 'mongoose';

const connection = { isConnected: 0 };
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 20000,
    heartbeatFrequencyMS: 10000,
    retryWrites: true,
};

async function connect() {
    if (connection.isConnected) {
        return;
    }

    if (mongoose.connections && mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.DATABASE_URL!, options);
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = 0;
        }
    }
}
const db = { connect, disconnect };

export default db;