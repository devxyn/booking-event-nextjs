"use server";

import Booking from "@/database/booking.model";
import connectDB from "../mongodb";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string }) => {
  try {
    await connectDB();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { success: false, message: "Invalid email address" };
    }

    const existingBooking = await Booking.findOne({ eventId, email });

    if (existingBooking) {
      return { success: false, message: "You have already booked this event" };
    }

    await Booking.create({ eventId, slug, email });

    return { success: true, message: null };
  } catch (error) {
    console.error("Creating booking failed", error);
    return { success: false, message: "Booking creation failed. Please try again." };
  }
};
