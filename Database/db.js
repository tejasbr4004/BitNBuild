const mongoose=require('mongoose');




const connection=async()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_URL);
        console.log('successfully Connected to MongoDB...');
    }
   catch(error){
    console.error('Failure..Could not connect to MongoDB...', error);
     }
}

module.exports=connection;