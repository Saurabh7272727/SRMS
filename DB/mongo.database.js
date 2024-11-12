import mongoose from 'mongoose';
import dotenv from 'dotenv';

const mongoDBconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongo.database.connect   PORT8080');
    } catch (error) {
        console.log("Failed to connect to Mongo =>  ");
        console.table([error.message]);
    }
}


export { mongoDBconnect };

