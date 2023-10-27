const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notes.controller");
const auth = require('../middlewares/auth.middleware');

router.use(auth);

//** GET - '/notes' for getting all notes  */
router.get("/", notesController.getNotes);

//** POST - '/notes/add-prdouct' for creating a new note  */
router.post("/add-note", notesController.addNote);

//** PATCH - 'notes/edit/:id' for editing a note  */
router.patch("/edit/:id", notesController.updateNote);

//** DELETE - 'notes/delete/:id' for deleting a note  */
router.delete("/delete/:id", notesController.deleteNote);

module.exports = router;
