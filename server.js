const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv/config');



const port =process.env.PORT||4000;

const app = express();

const dirname = path.resolve();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));
  
  app.use(express.json({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  
app.use('/',router)


const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DB_URI, dbOptions);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});
