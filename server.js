const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')

const dbOptions = {useNewUrlParser:true, useUnifiedTopology: true}
const port=process.env.PORT|| 4000

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DB_URI, dbOptions);
        console.log(`MOngoDB connected:${conn.connection.host}`)

    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus:200
} 

app.use(cors(corsOptions))
app.use('/', router)

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function(_, res){
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`server is running on ${port}`)
    }) 
});
