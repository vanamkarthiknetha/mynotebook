const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

//Route1: Endpoint for fetching all notes(Login required)
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal error ocuured");
  }
});

//Route2: Endpoint for adding a note(Login required)
router.post(
  "/addnote",  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Checking if given input by user is not valid for adding note
    try {
      const { title, description, tag } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
    }

      const note = await Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });
      const savedNotes = await note.save();
      res.send(savedNotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some internal error ocuured");
    }
  }
);
//Route3: Endpoint for updating a note(Login required)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // creating a new note
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;
  try {
    // finding note to be updated by given id
    let note = await Notes.findOne({ _id: req.params.id });
    if (!note) return res.status(404).send("Not found");
    // checking the if req user is owner of the note
    if (req.user.id !== note.user.toString())
      return res.status(401).send("Unauthorized access");

    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json(note)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some internal error ocuured");
  }
});
//Route4: Endpoint for deleting a note(Login required)
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
try {
     // finding note to be deleted by given id
  let note = await Notes.findOne({ _id: req.params.id });
  if (!note) return res.status(404).send("Not found");
  // checking the if req user is owner of the note
  if (req.user.id !== note.user.toString())
    return res.status(401).send("Unauthorized access");

    // deleting note 
    note=await Notes.findByIdAndDelete(req.params.id)

    res.json({success:"Successfully deleted the note",note})
} catch (error) {
  console.log(error.message);
  res.status(500).send("Some internal error ocuured");
}
})
module.exports = router;
