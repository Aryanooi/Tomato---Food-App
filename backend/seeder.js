import mongoose from 'mongoose';
import dotenv from 'dotenv';
import foodModel from './models/foodModel.js';
import { food_list } from './data/foodData.js';
import { connectDB } from './config/db.js'; // Assuming you have a DB connection function here

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const importData = async () => {
    try {
        // Clear existing food items to prevent duplicates
        await foodModel.deleteMany();

        // Insert the food_list array into the database
        await foodModel.insertMany(food_list);

        console.log('✅ Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Clear all food items
        await foodModel.deleteMany();

        console.log('🔥 Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Check for a command-line argument to decide whether to import or destroy data
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}