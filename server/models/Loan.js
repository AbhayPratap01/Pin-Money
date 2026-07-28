import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  personalDetails: {
    name: String,
    fatherName: String,
    dob: String,
    mobile: String,
    email: String,
    pan: String,
    aadhaar: String,
  },
  employmentDetails: {
    occupation: String,
    companyName: String,
    monthlyIncome: String,
    salaryMode: String,
  },
  loanDetails: {
    type: String,
    amount: String,
    tenure: String,
    purpose: String,
  },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Loan", LoanSchema);
