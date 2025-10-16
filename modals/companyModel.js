import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    industry: { type: String },
    website: { type: String },
    location: { type: String },
    description: { type: String },
    founded: { type: Number },
    employees: { type: Number },
    ceo: { type: String },
    logo: { type: String, default: "default-logo.png" },
    socialLinks: {  
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CompanyModel = mongoose.model("Company", companySchema);
export default CompanyModel;
