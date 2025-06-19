import Session from '../models/Session.model.js';

export const createSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSessions = async (_, res) => res.json(await Session.find().populate('therapistId patientId'));

export const updateSessionStatus = async (req, res) => {
  const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
  session ? res.json(session) : res.status(404).json({ error: 'Session not found' });
};
