import Application from '../models/Application.model.js';

export const submitApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPendingApplications = async (_, res) =>
  res.json(await Application.find({ status: 'pending' }).populate('therapistId'));

export const updateApplicationStatus = async (req, res) => {
  const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  application ? res.json(application) : res.status(404).json({ error: 'Application not found' });
};
