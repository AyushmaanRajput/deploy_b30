const { Notes } = require("../models/Notes.model");
const mongoose = require("mongoose");
const { Types } = mongoose;

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Notes.find({ userId: req.body.userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ message: "Couldn't add notes" });
  }
};

exports.addNote = async (req, res, next) => {
  let notes = req.body;
  try {
    let newNote = new Notes(notes);
    await newNote.save();
    res.status(200).json({ message: "Successfully added note", note: newNote });
  } catch (err) {
    res.status(400).json({ message: "Couldn't add notes" });
  }
};

exports.updateNote = async (req, res, next) => {
  const id = req.params.id;
  const note= await Notes.findOne({ _id: id });
  if (note.userId==req.body.userId) {
    try {
      const newNote = await Notes.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!newNote) {
        return res.status(404).json({ msg: "Note not found" });
      }
      res
        .status(200)
        .json({ message: "Successfully updated note", note: newNote });
    } catch (err) {
      res.status(400).json({ msg: "Couldn't update note" });
    }
  } else {
    res.status(400).json({ msg: "Unauthorized" });
  }
};

exports.deleteNote = async (req, res, next) => {
    const id = req.params.id;
    const note= await Notes.findOne({ _id: id });
    if (note.userId==req.body.userId) {
      try {
        const newNote = await Notes.findByIdAndDelete(id, req.body);
  
        if (!newNote) {
          return res.status(404).json({ msg: "Note not found" });
        }
        res
          .status(200)
          .json({ message: "Successfully deleted note", note: newNote });
      } catch (err) {
        res.status(400).json({ msg: "Couldn't update note" });
      }
    } else {
      res.status(400).json({ msg: "Unauthorized" });
    }
};
