import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user.id,
    });
    res.json({ success: true, data: subscription });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).json({
        success: false,
        message: "You're not the owner of this account",
      });
    }
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.json(subscriptions);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
