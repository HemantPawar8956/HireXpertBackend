import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    date: { type: Date, default: () => Date.now() },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("Payment", paymentSchema);
export default PaymentModel;
