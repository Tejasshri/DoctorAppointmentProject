// 📁 controllers/appointmentController.js
import Appointment from '../models/Appointment.models.js'


export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId therapistId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patientId therapistId');
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
