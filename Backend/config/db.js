import mongoose from "mongoose";
import 'dotenv/config'

export const connectToDB = async () => {
    mongoose.connect(process.env.MONGO_URL)
    .then((e) => console.log("MongoDB Connected Successfully"))
    .catch((err) => {console.error("MongoDB connection failed: ", err.message);
            process.exit(1);
        });

    }

