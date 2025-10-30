import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";
import { EventItem, events } from "@/lib/constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  "use cache";
  cacheLife("hours");

  // const response = await fetch(`${BASE_URL}/api/events`);
  // const { events } = await response.json();

  return (
    <section>
      <h1 className='text-center'>
        Where Devs Gather. <br /> Where Ideas Spark.
      </h1>
      <p className='text-center mt-5'>Hackathons, Meetups, and Conferences, All in One Place</p>

      <ExploreBtn />

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>

        <ul className='events'>
          {events &&
            events.length > 0 &&
            events.map((event: EventItem) => (
              <li key={event.slug} className='list-none'>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
