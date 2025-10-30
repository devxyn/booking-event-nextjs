import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
  <div className='flex-row-gap-2 items-center'>
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: [string] }) => (
  <div className='agenda'>
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((agenda) => (
        <li key={agenda}>{agenda}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: [string] }) => (
  <div className='flex flex-row gap-5 flex-wrap'>
    {tags.map((tag) => (
      <div className='pill' key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  "use cache";
  cacheLife("hours");

  const { slug } = await params;
  console.log(params);

  let event;

  try {
    const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!request.ok) {
      if (request.status === 404) {
        return notFound();
      }
      throw new Error(`Failed to fetch event: ${request.statusText}`);
    }

    const response = await request.json();
    event = response.event;

    if (!event) {
      return notFound();
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return notFound();
  }

  const { title, description, image, overview, date, time, location, mode, agenda, tags, audience, organizer } = event;

  if (!description) return notFound();

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id='event'>
      <div className='header'>
        <h1>Event Description</h1>
        <p className='mt-2'>{description}</p>
      </div>

      <div className='details'>
        {/* Content */}
        <div className='content'>
          <Image src={image} alt={`${title} Banner`} width={800} height={800} className='banner' />

          <section className='flex-col-gap-2'>
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className='flex-col-gap-2'>
            <h2>Event Details</h2>
            <EventDetailItem icon='/icons/calendar.svg' alt='calendar' label={date} />
            <EventDetailItem icon='/icons/clock.svg' alt='clock' label={time} />
            <EventDetailItem icon='/icons/pin.svg' alt='pin' label={location} />
            <EventDetailItem icon='/icons/mode.svg' alt='mode' label={mode} />
            <EventDetailItem icon='/icons/audience.svg' alt='audience' label={audience} />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className='flex-col-gap-2'>
            <h2>Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>
        {/* Form */}
        <aside className='booking'>
          <div className='signup-card'>
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className='text-sm'>Join {bookings} people who have already booked their spot!</p>
            ) : (
              <p className='text-sm'>Be the first to book your spot!</p>
            )}

            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className='flex w-full flex-col gap-4 pt-20'>
        <h2>Similar Events</h2>
        <div className='events'>
          {similarEvents.length > 0 &&
            similarEvents.map((similarEvent: IEvent) => <EventCard key={similarEvent._id} {...similarEvent} />)}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
