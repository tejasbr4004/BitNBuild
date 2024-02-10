const express=require('express');
const app=express();

require('dotenv').config();
const morgan=require('morgan');

const cors=require('cors');
const bodyParser=require('body-parser');
const ConnectDB=require('./Database/db');
const OrganiserRoute=require('./Routes/Organiser');


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))





app.use(OrganiserRoute);



ConnectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`app listening to port ${process.env.PORT}....`);
    });
});