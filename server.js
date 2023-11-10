const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const mongoose = require('mongoose')
require('dotenv/config')


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

const dbOptions = {useNewUrlParser:true, useUnifiedTopology: true}
mongoose.connect(process.env.DB_URI, dbOptions).then(()=>console.log("connected")).catch(err=>console.log(err))


const port=process.env.PORT|| 4000
const server = app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
}) 