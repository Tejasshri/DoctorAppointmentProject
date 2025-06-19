import SystemSetting from '../models/SystemSetting.model.js';

export const getSetting = async (req, res) => {
  const setting = await SystemSetting.findOne({ key: req.params.key });
  setting ? res.json(setting) : res.status(404).json({ error: 'Not found' });
};

export const updateSetting = async (req, res) => {
  const updated = await SystemSetting.findOneAndUpdate({ key: req.params.key }, req.body, { new: true, upsert: true });
  res.json(updated);
};
