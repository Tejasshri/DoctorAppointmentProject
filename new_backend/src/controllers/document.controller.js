// 📁 controllers/documentController.js
import Document from '../models/Document.models.js';

export const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find().populate('therapistId');
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).populate('therapistId');
    if (!doc) return res.status(404).json({ error: 'Document not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createDocument = async (req, res) => {
  try {
    const newDoc = await Document.create(req.body);
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const updated = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
