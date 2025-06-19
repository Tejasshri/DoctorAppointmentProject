import mongoose from "mongoose";

const SystemSettingSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: mongoose.Schema.Types.Mixed,
});

export default mongoose.model("SystemSetting", SystemSettingSchema);
