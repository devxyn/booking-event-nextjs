"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { FormEvent, useState } from "react";

interface BookEventProps {
  eventId: string;
  slug: string;
}

const BookEvent = ({ eventId, slug }: BookEventProps) => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { success, message } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture("event-booked");
    } else {
      setError(message);
      posthog.capture("booking_failed", { error: message });
    }
    setIsSubmitting(false);
  };

  return (
    <div id='book-event'>
      {submitted ? (
        <p className='text-sm'>Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
          {error && <p className='text-sm text-red-600'>{error}</p>}
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
          <button type='submit' className='button-submit' disabled={isSubmitting}>
            {!isSubmitting ? "Submit" : "Submitting..."}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
