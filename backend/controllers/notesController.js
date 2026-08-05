const Note = require('../models/Note');

// Get all notes for logged-in user
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).populate('category').sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single note by ID (only if it belongs to user)
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('category');
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Check if note belongs to user
    if (note.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newNote = new Note({
      title,
      content,
      category: category || null,
      userId: req.userId,
      userEmail: req.userEmail,
    });

    const savedNote = await newNote.save();
    const populatedNote = await savedNote.populate('category');
    res.status(201).json(populatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a note (only if it belongs to user)
exports.updateNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Check if note belongs to user
    if (note.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, category, updatedAt: Date.now() },
      { new: true }
    ).populate('category');

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a note (only if it belongs to user)
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Check if note belongs to user
    if (note.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search notes by title or content (only user's notes)
exports.searchNotes = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const notes = await Note.find({
      userId: req.userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).populate('category').sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
