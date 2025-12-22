import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);
export default Event;
