import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("database connected");
        })

        connection.on('error', (error) => {
            console.log("database not connected", error);
            process.exit()
        })
    } catch (error) {
        console.log("connection was not sucessfull", error);
    }
}