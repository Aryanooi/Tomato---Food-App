import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item
const addFood=async (req,res)=>{
    let image_filename=`${req.file.filename}`;


    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category
    });  
    try{
        await food.save();
        res.json({success:true, message:"Food item added"});
    } catch(err){
        console.log(err);
        res.json({success:false, message:"Error in adding food item"});
    }        
}
// list all food items
const listFood=async (req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true, foods:foods});
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error in fetching food items"});
    }
}
//remove food item

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.body.id);

        if (food) {
            fs.unlinkSync(`uploads/${food.image}`);
            res.json({ success: true, message: "Food item removed" });
        }
        else {
            res.status(404).json({ success: false, message: "Food item not found" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error in removing food item" });
    }
};
export {addFood,listFood,removeFood};