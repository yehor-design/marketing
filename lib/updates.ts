export type UpdateSection = {
  heading: string;
  items: string[];
};

export type UpdateNote = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateTime: string;
  /** Ordered-dither source. Absent when the cover is a video. */
  image?: string;
  imageAlt?: string;
  videoId?: string;
  poster?: string;
  socialImage: string;
  sections: UpdateSection[];
};

/**
 * Live collection order on https://jet.framer.website/updates, newest first.
 * Alphabetical slug order is a different sequence.
 */
export const updates: UpdateNote[] = [
  {
    slug: "june-jetstream-update",
    title: "June Jetstream Update",
    description:
      "The June Jetstream Update supercharges your one-click optimize feature! We’ve refined the engine to deliver even faster results, cutting load times by up to 30% for complex sites. Real-time alerts now ping you instantly via email or mobile, keeping you ahead of any performance hiccups.",
    date: "Jun 10, 2025",
    dateTime: "2025-06-10",
    image: "/updates/june.png",
    imageAlt: "june",
    socialImage: "/updates/social/june.png",
    sections: [
      {
        heading: "Added",
        items: ["Mobile app notifications for real-time alerts"],
      },
      {
        heading: "Improved",
        items: [
          "One-click optimize now 30% faster for high-traffic sites",
          "Quicker DNS pre-fetching implementation",
        ],
      },
    ],
  },
  {
    slug: "may-surge-update",
    title: "May Surge Update",
    description:
      "The May Surge Update brings a unified Analytics & Monitoring hub, now centralized in your Jet dashboard! Real-time speed monitoring, Google PageSpeed integration, and competitor comparison are easier to access and more insightful than ever. We’ve also rolled out a batch of fixes and tweaks based on your feedback from our Spring Speed Summit.",
    date: "May 6, 2025",
    dateTime: "2025-05-06",
    videoId: "KE_305NRdN0",
    poster: "/updates/may.jpg",
    socialImage: "/updates/social/may.png",
    sections: [
      {
        heading: "Added",
        items: [
          "Unified Analytics & Monitoring hub with single-click access",
          "New “Performance Trends” graph for weekly insights",
        ],
      },
      {
        heading: "Improved",
        items: [
          "Smoother Google PageSpeed integration for real-time scores",
          "Enhanced mobile vs. desktop insights with clearer visuals",
        ],
      },
      {
        heading: "Fixed",
        items: [
          "Resolved intermittent delay in real-time alerts delivery",
          "Fixed overlap in competitor comparison chart labels",
        ],
      },
    ],
  },
  {
    slug: "march-momentum-update",
    title: "March Momentum Update",
    description:
      "The March Momentum Update powers up code optimization! We’ve revamped our JavaScript and CSS minification to strip bloat faster and smarter, delivering instant performance boosts. A new “Code Health” report in Analytics & Monitoring lets you see exactly how much leaner your site is.",
    date: "Mar 17, 2025",
    dateTime: "2025-03-17",
    image: "/updates/march.png",
    imageAlt: "march",
    socialImage: "/updates/social/march.png",
    sections: [
      {
        heading: "Added",
        items: ["“Code Health” report in Analytics & Monitoring dashboard"],
      },
      {
        heading: "Improved",
        items: [
          "JavaScript and CSS minification now 25% more efficient",
          "Faster file combination for reduced HTTP requests",
        ],
      },
      {
        heading: "Fixed",
        items: ["Fixed rare issue with HTML optimization breaking custom tags"],
      },
    ],
  },
  {
    slug: "february-flash-update",
    title: "February Flash Update",
    description:
      "The February Flash Update brings image optimization to the next level! We’ve fine-tuned automatic compression and next-gen format conversion to slash image load times even further. Your visuals now load in milliseconds across all devices, keeping visitors engaged. Plus, we’ve added a shiny new feature to preview optimization results before they go live.",
    date: "Feb 12, 2025",
    dateTime: "2025-02-12",
    image: "/updates/february.png",
    imageAlt: "february",
    socialImage: "/updates/social/february.png",
    sections: [
      {
        heading: "Added",
        items: [
          "Pre-optimization preview tool for image adjustments",
          "Support for AVIF format in next-gen conversion",
        ],
      },
      {
        heading: "Improved",
        items: [
          "Faster automatic image compression by 15%",
          "Enhanced responsive image sizing for mobile breakpoints",
        ],
      },
    ],
  },
  {
    slug: "launch-blitz-update",
    title: "Launch Blitz Update",
    description:
      "The Launch Blitz Update kicks off 2025 with a turbocharged one-click optimization engine! We’ve supercharged our core feature to make your site faster than ever—initiate optimization with a single click and watch load times plummet. New users can now onboard seamlessly with a revamped 3-step process, and we’ve sprinkled in enhancements based on feedback from our biggest clients.",
    date: "Jan 15, 2025",
    dateTime: "2025-01-15",
    image: "/updates/january.png",
    imageAlt: "january",
    socialImage: "/updates/social/launch.png",
    sections: [
      {
        heading: "Added",
        items: [
          "Enhanced one-click optimize algorithm for 20% faster results",
          "Interactive onboarding tutorial for new users",
          "Custom welcome dashboard for first-time URL entries",
        ],
      },
      {
        heading: "Improved",
        items: [
          "Streamlined “Enter URL” step for faster input validation",
          "Boosted Global CDN integration for broader coverage",
        ],
      },
      {
        heading: "Fixed",
        items: [
          "Resolved occasional lag in real-time speed monitoring startup",
          "Corrected minor UI glitch in competitor comparison view",
        ],
      },
    ],
  },
];

export function getUpdate(slug: string) {
  return updates.find((note) => note.slug === slug);
}
