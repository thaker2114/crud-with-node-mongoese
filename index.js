import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';


const app = express();

app.use(bodyParser.json());

dotenv.config();

const port = process.env.PORT || 3000;


const mongodbURI = process.env.MONGO_URL;

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))

// Middleware to parse JSON request bodies

app.use(express.json());


app.get('/', (req, res) => {

    res.json({ message: 'Hello, World!' });
});
// Middleware to log request details

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${req.ip}`);
    next();
});


app.use('/api/users', route);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


///MONGO_URL=mongodb+srv://thaker2112:gxPqLwqus9oPLSvg@cluster0.n5am6.mongodb.net/CRUD?retryWrites=true&w=majority&appName=Cluster0