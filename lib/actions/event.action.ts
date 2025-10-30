"use server";

import Event, { IEvent } from "@/database/event.model";
import connectDB from "../mongodb";

export const getSimiliarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    const events = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();

    return events as unknown as IEvent[];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return [];
  }
};
