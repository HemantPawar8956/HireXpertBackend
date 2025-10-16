import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: { type: String, trim: true },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dfw1ywjsk/image/upload/v1757294378/defaultProfilePicture_huawr4.png",
    },
    bio: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" },
      portfolio: { type: String, default: "" },
      hackerRank: { type: String, default: "" },
    },
    isActive: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["user", "admin", "recruiter"],
      default: "user",
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isAccountVerified: { type: Boolean, default: false },
    isTermsAccepted: { type: Boolean, default: false },
    isPrivacyPolicyAccepted: { type: Boolean, default: false },
    preferences: {
      theme: { type: String, default: "light" },
      language: { type: String, default: "en" },
    },
    loginAttempts: { type: Number, default: 0 },
    lastLogin: { type: Date },
    lastLoginDevice: { type: String, default: "" },
    lastLoginLocation: { type: String, default: "" },
    lastLogoutTime: { type: Date },
    lastPasswordChange: { type: Date },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    lastPasswordResetRequest: { type: Date },
    lastProfileUpdate: { type: Date, default: () => Date.now() },
    profileVisibility: {
      type: String,
      enum: ["public", "private", "friends_only"],
      default: "public",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
