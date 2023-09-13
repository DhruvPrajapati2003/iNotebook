const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new mongoose.Schema({
   user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'user'
   },
   title:{
    type:String,
    require:true
   },
   descreption:{
    type:String,
    require:true
   },
   tag:{
    type:String,
    default:'General'
   }, 
   date:{
    type:Date,
    default:Date.now
   },
  }, { collection: "notes" });
  exports.Notes=mongoose.model('notes',NotesSchema)

 