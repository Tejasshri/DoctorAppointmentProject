// 📁 controllers/noteController.js
import Note from '../models/Note.models.js';

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('appointmentId therapistId');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('appointmentId therapistId');
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createNote = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

