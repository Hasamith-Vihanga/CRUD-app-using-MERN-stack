const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //convert to java script object
const cors = require('cors');

const app = express();

//import routes
const postRoutes = require('./routes/posts');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(postRoutes);

const PORT = 8000;
const DB_URL = 'mongodb://twg:twg123@ac-nlvmbjh-shard-00-00.zq8bndk.mongodb.net:27017,ac-nlvmbjh-shard-00-01.zq8bndk.mongodb.net:27017,ac-nlvmbjh-shard-00-02.zq8bndk.mongodb.net:27017/?ssl=true&replicaSet=atlas-smslnz-shard-0&authSource=admin&appName=mernApp';

mongoose.connect(DB_URL)
.then(() =>{
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () =>{
    console.log(`App is running on ${PORT}`);
});
