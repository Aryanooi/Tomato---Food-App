import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
// app config
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/images',express.static('uploads'));

// db config
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import router from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js';
connectDB();
 
// api endpoints
app.use("/images",express.static("uploads"));
app.use("/api/food",foodRouter);
app.use("/api/user",router)
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});    

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});                           

//mongodb+srv://insane:aryanInsane@cluster0.em02nf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0