import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
dotenv.config()

const uri =process.env.MONGO_URL
const port = 8000;

const connect = async () =>{
    try{
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch(err){
        throw err;
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDb disconnected')
})
mongoose.set('strictQuery', true);

//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,');
    next();
  })

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(port, ()=>{
    connect();
    console.log(`Example app listening at http://localhost:${port}`);
})