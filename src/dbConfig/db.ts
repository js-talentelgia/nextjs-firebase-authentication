import mongoose from "mongoose";

export default async function connect() {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI!}`);
       const connection = mongoose.connection;
       connection.on('connected', () => {
         console.log('Connected to MongoDB');
       })
       connection.on('error', (err) => {
           console.log('Error connecting to MongoDB', err);
           process.exit(1);
       })
    } catch (error) {
        console.log(`\n Mongo DB connection error: ${error}`);
        process.exit(1);
    }
}