import EventDetails from "@/components/EventDetails";
import { Suspense } from "react";

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params.then((p) => p.slug);

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails params={slug} />
        test
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
