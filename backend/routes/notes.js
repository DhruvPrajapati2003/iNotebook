const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Model = require("../models/Notes");
const Notes = Model.Notes;
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//---------------------------------------------------------------------------------------------------------------

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error saving data:", error);
  }
});
module.exports = router;

//---------------------------------------------------------------------------------------------------------------

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter A Valid title").isLength({ min: 3 }),
    body("descreption", "Enter A description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, descreption, tag } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
      }
      const note = new Notes({
        title,
        descreption,
        tag,
        user: req.user.id,
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  });



//--------------------------------------------------------------------------------------------------------------





  router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        const {title,descreption,tag}=req.body;
const newNote={};
if(title){newNote.title=title}
if(descreption){newNote.descreption=descreption}
if(tag){newNote.tag=tag}
try {
let note=await Notes.findById(req.params.id);
if(!note){
    return res.status(404).send("not found")
}
if(note.user.toString()!==req.user.id){
    return res.status(404).send("Not Allowed")
}
note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note})
}
  catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Server Error" });
  }
  });
    



//--------------------------------------------------------------------------------------------------------------


     

router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
      
let note=await Notes.findById(req.params.id);
if(!note){
    return res.status(404).send("not found")
}
if(note.user.toString()!==req.user.id){
    return res.status(404).send("Not Allowed")
}
note=await Notes.findByIdAndDelete(req.params.id)
res.json("Sucess");
    })



//--------------------------------------------------------------------------------------------------------------



