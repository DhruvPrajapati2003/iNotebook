const mongoose = require("mongoose");

 

const connecToMongo = async() => { 

  const mongoURl = "mongodb://127.0.0.1:27017/Dhruv";

 
       mongoose.set("strictQuery", false);
      mongoose.connect( 
      
      mongoURl,
      {
        
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
       

      },
      () => {
        console.log("connected to mongo");
      }
    );
    
  };

  
  module.exports = connecToMongo;

 








