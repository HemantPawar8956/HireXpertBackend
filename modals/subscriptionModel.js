import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      enum: ["free", "basic", "premium", "enterprise"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled", "expired"],
      default: "inactive",
    },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  { timestamps: true }
);

const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);
export default SubscriptionModel;
