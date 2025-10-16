import PaymentModel from "../modals/paymentModel.js";

export const createPayment = async (req, res) => {
  try {
    const payment = new PaymentModel(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find().populate("userId", "name email");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await PaymentModel.findById(req.params.id).populate(
      "userId"
    );
    payment
      ? res.json(payment)
      : res.status(404).json({ message: "Payment not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const updated = await PaymentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    updated
      ? res.json(updated)
      : res.status(404).json({ message: "Payment not found" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deleted = await PaymentModel.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: "Payment deleted" })
      : res.status(404).json({ message: "Payment not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
