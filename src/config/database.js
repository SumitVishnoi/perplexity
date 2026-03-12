import mongoose from "mongoose"

const connectedDB = async ()=> {
    await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB connected`)
};


export default connectedDB