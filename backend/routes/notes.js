const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Get all notes
router.get('/', notesController.getAllNotes);

// Search notes
router.get('/search', notesController.searchNotes);

// Get a single note
router.get('/:id', notesController.getNoteById);

// Create a new note
router.post('/', notesController.createNote);

// Update a note
router.put('/:id', notesController.updateNote);

// Delete a note
router.delete('/:id', notesController.deleteNote);

module.exports = router;
