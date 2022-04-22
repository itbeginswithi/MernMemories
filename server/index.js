import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
const app = express();
dotenv.config();  

const PORT = process.env.PORT || 4000;  
const CONNECTION_URL = `${process.env.CONNECTION_URL}`  

//to properly send reqs
app.use(bodyParser.json({limit : '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit : '30mb', extended: true}));

app.use(cors());

app.use('/posts', postRoutes)
app.use('/users', userRoutes)


mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server listening on ${PORT}`) ))
.catch(error => console.error(error))