export type EventItem = {
  title: string;
  image: string;
  slug: string;
  date: string;
  time: string;
  location: string;
  url: string;
};

export const events: EventItem[] = [
  {
    title: "React Summit 2025",
    image: "/images/event1.png",
    slug: "react-summit-2025",
    date: "Jun 12–13, 2025",
    time: "09:00–18:00",
    location: "Amsterdam, NL",
    url: "https://reactsummit.com/",
  },
  {
    title: "GitHub Universe 2025",
    image: "/images/event2.png",
    slug: "github-universe-2025",
    date: "Oct 15–16, 2025",
    time: "09:30–17:30",
    location: "San Francisco, CA",
    url: "https://githubuniverse.com/",
  },
  {
    title: "AWS re:Invent 2025",
    image: "/images/event3.png",
    slug: "aws-reinvent-2025",
    date: "Dec 1–5, 2025",
    time: "09:00–17:00",
    location: "Las Vegas, NV",
    url: "https://reinvent.awsevents.com/",
  },
  {
    title: "Next.js Conf 2025",
    image: "/images/event4.png",
    slug: "nextjs-conf-2025",
    date: "Nov 12, 2025",
    time: "10:00–16:00",
    location: "Online",
    url: "https://nextjs.org/conf",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2025",
    image: "/images/event5.png",
    slug: "kubecon-na-2025",
    date: "Nov 18–21, 2025",
    time: "09:00–18:00",
    location: "TBD (North America)",
    url: "https://kubecon.io/",
  },
  {
    title: "ETHGlobal Hackathon: Winter 2025",
    image: "/images/event6.png",
    slug: "ethglobal-winter-2025",
    date: "Dec 12–14, 2025",
    time: "All weekend",
    location: "Online",
    url: "https://ethglobal.com/",
  },
] as const;
