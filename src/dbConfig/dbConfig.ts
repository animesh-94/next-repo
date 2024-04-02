import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', ()=> {
            console.log("Database is connected successfully");
        })

        connection.on('error', (err)=> {
            console.log("Database connection is failed. Make sure to connect the database. " + err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went Wrong");
        console.log(error);
    }
}