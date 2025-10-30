"use client";

import { createBooking } from "@/lib/actions/booking.action";
import posthog from "posthog-js";
import { FormEvent, useState } from "react";

interface BookEventProps {
  eventId: string;
  slug: string;
}

const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture("event-booked");
    } else {
      console.error("Booking creation failed");
      posthog.captureException("Booking creation failed");
    }
  };

  return (
    <div id='book-event'>
      {submitted ? (
        <p className='text-sm'>Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              placeholder='Please enter your email address'
              required
            />
          </div>
          <button type='submit' className='button-submit'>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
