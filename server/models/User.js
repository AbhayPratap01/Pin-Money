import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  pan: { type: String, required: true },
  aadhaar: { type: String, required: true },
  password: { type: String, required: true },
  cibilScore: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);
