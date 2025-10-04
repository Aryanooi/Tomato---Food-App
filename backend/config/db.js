import mongoose from "mongoose";


export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://insane:aryanInsane@cluster0.em02nf5.mongodb.net/food-del').then(()=>{
    console.log("DB connected");
  });
}