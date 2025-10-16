import SubscriptionModel from "../modals/subscriptionModel.js";

export const createSubscription = async (req, res) => {
  try {
    const subscription = new SubscriptionModel(req.body);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionModel.find().populate(
      "userId",
      "name email"
    );
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubscriptionById = async (req, res) => {
  try {
    const sub = await SubscriptionModel.findById(req.params.id).populate(
      "userId"
    );
    sub
      ? res.json(sub)
      : res.status(404).json({ message: "Subscription not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const updated = await SubscriptionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    updated
      ? res.json(updated)
      : res.status(404).json({ message: "Subscription not found" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const deleted = await SubscriptionModel.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: "Subscription deleted" })
      : res.status(404).json({ message: "Subscription not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
