import mongoose from "mongoose";

export const ConnectDB = async()=>{
    await mongoose.connect('mongodb+srv://vinaypratap:vinay1234@cluster0.cfgaife.mongodb.net/blog-app')
    console.log("DB Connected")
}