import mongoose, { Schema } from "mongoose";

// we don't save subscribers in user, we save it in subscriptions because if we save in array, it will be expensive operation to unsubscribe

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is subscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, // one who is being subscribed to
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
