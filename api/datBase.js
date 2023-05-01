import mongoose from "mongoose";

export const db = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });
        console.log(`Database Connected with ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error- ${error.message}`);
        process.exit();

    }

};