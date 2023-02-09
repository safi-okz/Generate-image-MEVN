import mongoose from "mongoose";

export const connectDb = (url) => {
    mongoose.set("strictQuery", true);

    mongoose.connect(url).then(() => console.log('DB connectd')).catch(err => console.log(err));
}