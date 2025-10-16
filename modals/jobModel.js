import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    location: { type: String },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    skillsRequired: [{ type: String }],
    postedAt: { type: Date, default: () => Date.now() },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;
