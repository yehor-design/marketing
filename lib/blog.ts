export type Author = {
  name: string;
  role: string;
  image: string;
};

export type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "code"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateTime: string;
  category: string;
  image: string;
  imageAlt: string;
  authors: Author[];
  related: string[];
  body: Block[];
};

const emma: Author = {
  name: "Emma Novak",
  role: "Performance Analyst",
  image: "/about/emma.png",
};

const priya: Author = {
  name: "Priya Mehra",
  role: "Product Marketing Manager",
  image: "/about/priya.png",
};

const daniel: Author = {
  name: "Daniel Cooper",
  role: "Lead Solutions Engineer",
  image: "/about/daniel.png",
};

const sofia: Author = {
  name: "Sofia Almeida",
  role: "Customer Success Lead",
  image: "/about/sofia.png",
};

const tomasz: Author = {
  name: "Tomasz Zielinski",
  role: "Frontend Architect",
  image: "/about/tomasz.png",
};

const grace: Author = {
  name: "Grace Lee",
  role: "SEO Strategist",
  image: "/about/grace.png",
};

export const blogCategories = [
  "All",
  "Productivity",
  "Infrastructure",
  "Performance",
  "Optimization",
  "Case Study",
  "SEO",
] as const;

/** Live collection order, newest first. */
export const posts: Post[] = [
  {
    slug: "why-website-speed-matters-more-than-ever-in-2025",
    title: "Why Website Speed Matters More Than Ever in 2025",
    description:
      "Discover how lightning-fast load times can boost your SEO, improve user experience, and drive real business results—plus actionable tips to speed up your site today.",
    date: "Jun 7, 2025",
    dateTime: "2025-06-07",
    category: "Performance",
    image: "/blog/speed.png",
    imageAlt: "gradient",
    authors: [emma, priya],
    related: [
      "image-optimization-the-secret-to-lightning-fast-sites",
      "how-jet-helped-us-increase-conversions-by-30",
    ],
    body: [
      { kind: "h2", text: "The need for speed" },
      {
        kind: "p",
        text: "In 2025, website visitors expect instant results. If your homepage takes longer than a second to load, you’re losing potential customers. Research shows that a 1-second delay in load time can reduce conversions by up to 20%. With the rise of mobile browsing and global audiences, speed is no longer a luxury—it’s a necessity.",
      },
      {
        kind: "quote",
        text: "“A fast website isn’t just a nice-to-have. It’s the difference between gaining a customer and losing one.”",
      },
      { kind: "h2", text: "SEO and business impact" },
      {
        kind: "p",
        text: "Google now ranks sites based on performance metrics like Core Web Vitals. Faster sites see higher search rankings, reduced bounce rates, and longer session times. A speedy website isn’t just good for users—it’s essential for business growth.",
      },
      { kind: "h3", text: "Performance vs. Results table" },
      {
        kind: "table",
        headers: ["Metric", "Slow site", "Fast site"],
        rows: [
          ["Avg. load time", "3,2 s", "0,9 s"],
          ["Bounce rate", "58%", "29%"],
          ["Conversion rate", "1,3%", "2,6%"],
          ["Google ranking", "Page 2", "Page 1"],
        ],
      },
      { kind: "h3", text: "Actionable tips" },
      {
        kind: "p",
        text: "Implementing website speed improvements doesn’t have to be overwhelming. By focusing on a few high-impact strategies, you can dramatically boost your site’s performance and deliver a better experience for every visitor. Start with these proven, actionable tips to see immediate results:",
      },
      {
        kind: "list",
        items: [
          "Compress and convert images to next-gen formats (WebP, AVIF)",
          "Minify JavaScript, CSS, and HTML",
          "Use a global CDN for rapid content delivery",
          "Enable browser caching and GZIP compression",
        ],
      },
      { kind: "h3", text: "Example: Code minification" },
      {
        kind: "code",
        text: `// Before minification
function greet(name) {
    console.log("Hello, " + name + "!");
}

// After minification
function greet(n){console.log("Hello, "+n+"!");}`,
      },
      { kind: "h2", text: "Why Jet?" },
      {
        kind: "p",
        text: "Jet makes all these optimizations automatic. With one click, your site is faster, your SEO improves, and your users stay happy.",
      },
    ],
  },
  {
    slug: "image-optimization-the-secret-to-lightning-fast-sites",
    title: "Image Optimization: The Secret to Lightning-Fast Sites",
    description:
      "Learn how next-gen image formats and compression can dramatically improve your website’s performance without sacrificing quality.",
    date: "May 26, 2025",
    dateTime: "2025-05-26",
    category: "Optimization",
    image: "/blog/images.png",
    imageAlt: "gradient",
    authors: [daniel, sofia],
    related: [
      "why-website-speed-matters-more-than-ever-in-2025",
      "how-jet-helped-us-increase-conversions-by-30",
    ],
    body: [
      { kind: "h2", text: "Why images matter" },
      {
        kind: "p",
        text: "Images account for more than half of the average web page’s weight. If your images aren’t optimized, even the most beautiful site can feel slow and unresponsive. Uncompressed, outdated formats and oversized files are the most common culprits behind sluggish load times.",
      },
      {
        kind: "quote",
        text: "Jet’s image optimization dropped our homepage load time by 1,5 seconds—no manual work needed.",
      },
      { kind: "h2", text: "The hidden cost of slow images" },
      {
        kind: "p",
        text: "A slow-loading image can cost you more than just a few seconds—it can cost you sales, users, and search rankings. According to recent studies, 39% of users will stop engaging with a website if images take too long to load. That’s why modern image optimization isn’t just a technical detail—it’s a business priority.",
      },
      { kind: "h3", text: "Image formats table" },
      {
        kind: "table",
        headers: ["Format", "Size (KB)", "Quaity"],
        rows: [
          ["JPEG", "120", "Good"],
          ["PNG", "180", "Excellent"],
          ["WebP", "60", "Excellent"],
          ["AVIF", "45", "Excellent"],
        ],
      },
      { kind: "h2", text: "Actionable tips" },
      {
        kind: "p",
        text: "Optimizing your site’s images doesn’t have to be complicated. By following a few best practices, you can drastically improve your load times and user experience. Here’s where to start:",
      },
      {
        kind: "list",
        items: [
          "Compress and convert images to next-gen formats (WebP, AVIF)",
          "Use responsive image sizes for different devices",
          "Implement lazy loading for images below the fold",
          "Serve images through a CDN for instant global delivery",
        ],
      },
      { kind: "h3", text: "Example: Lazy loading" },
      {
        kind: "code",
        text: '<img src="photo.webp" loading="lazy" alt="Optimized photo">',
      },
      { kind: "h3", text: "Jet's approach" },
      {
        kind: "p",
        text: "Jet handles all of this behind the scenes. Upload your images and let Jet do the rest—no plugins, no manual work.",
      },
    ],
  },
  {
    slug: "how-jet-helped-us-increase-conversions-by-30",
    title: "How Jet Helped Us Increase Conversions by 30%",
    description:
      "A real-world case study showing how Jet’s speed optimizations led to a dramatic rise in sales for an online store.",
    date: "Apr 28, 2025",
    dateTime: "2025-04-28",
    category: "Case Study",
    image: "/blog/conversions.png",
    imageAlt: "Orange Flower",
    authors: [sofia, tomasz],
    related: [
      "why-website-speed-matters-more-than-ever-in-2025",
      "image-optimization-the-secret-to-lightning-fast-sites",
    ],
    body: [
      { kind: "h2", text: "The challenge" },
      {
        kind: "p",
        text: "Our client, a growing e-commerce brand, faced high bounce rates and abandoned carts due to slow page loads. Every second counted, especially on mobile, where users are even less forgiving of delays. Despite investing in high-quality products and marketing, the site’s sluggish performance was costing them sales and damaging their reputation.",
      },
      {
        kind: "quote",
        text: "We knew speed was important, but we didn’t realize just how much revenue we were leaving on the table until we saw the numbers.",
      },
      { kind: "h2", text: "Diagnosing the bottlenecks" },
      { kind: "p", text: "A performance audit revealed several issues:" },
      {
        kind: "list",
        items: [
          "Large, uncompressed images were slowing down key landing pages.",
          "Bloated JavaScript and CSS files increased load times, especially for returning visitors.",
          "The lack of a global CDN meant international shoppers experienced even longer delays.",
          "No real-time monitoring made it hard to spot and fix slowdowns quickly.",
        ],
      },
      { kind: "h2", text: "Implementing Jet" },
      {
        kind: "p",
        text: "After onboarding with Jet, the transformation was immediate and measurable. With just a few clicks, Jet’s optimization suite went to work:",
      },
      {
        kind: "list",
        items: [
          "Automatic image optimization",
          "Code minification",
          "CDN integration",
          "Real-time performance monitoring",
        ],
      },
      { kind: "h3", text: "Conversion impact table" },
      {
        kind: "table",
        headers: ["Metric", "Before Jet", "After Jet"],
        rows: [
          ["Avg. Load Time (s)", "2,8", "0,8"],
          ["Conversion Rate", "1,8%", "2,4%"],
          ["Bounce Rate", "44%", "27%"],
        ],
      },
      {
        kind: "quote",
        text: "Jet’s one-click optimization turned our sluggish site into a conversion machine.",
      },
      { kind: "h3", text: "Example: Real-time Monitoring Code" },
      {
        kind: "p",
        text: "Jet’s real-time monitoring is as simple as adding a single script tag to your site. This snippet gives you live insights into your performance and alerts you if anything slows down:",
      },
      {
        kind: "code",
        text: `// Jet real-time monitoring snippet
<script src="https://cdn.jet.com/monitor.js"></script>`,
      },
      {
        kind: "p",
        text: "With Jet, our client didn’t just speed up their website—they unlocked higher conversions, happier customers, and sustainable growth.",
      },
    ],
  },
  {
    slug: "the-ultimate-guide-to-core-web-vitals",
    title: "The Ultimate Guide to Core Web Vitals",
    description:
      "Everything you need to know about Core Web Vitals, why they matter for your site, and how Jet helps you ace every metric.",
    date: "Apr 18, 2025",
    dateTime: "2025-04-18",
    category: "SEO",
    image: "/blog/vitals.png",
    imageAlt: "gradient",
    authors: [grace, priya],
    related: [
      "why-website-speed-matters-more-than-ever-in-2025",
      "image-optimization-the-secret-to-lightning-fast-sites",
    ],
    body: [
      { kind: "h2", text: "What are core web vitals?" },
      {
        kind: "p",
        text: "Core Web Vitals are Google’s key metrics for user experience. They measure how quickly your site loads, how soon it becomes interactive, and how stable the layout is as content appears. These three metrics are now critical ranking factors for search engines and a direct reflection of your visitors’ satisfaction.",
      },
      {
        kind: "list",
        items: [
          "Largest Contentful Paint (LCP): Loading performance",
          "First Input Delay (FID): Interactivity",
          "Cumulative Layout Shift (CLS): Visual stability",
        ],
      },
      {
        kind: "quote",
        text: "Optimizing for Core Web Vitals isn’t just about SEO—it’s about delivering a world-class experience.",
      },
      { kind: "h2", text: "Why do Core Web Vitals matter?" },
      {
        kind: "p",
        text: "A site that excels in Core Web Vitals feels instant and smooth for every user. If your LCP is slow, visitors see a blank or incomplete page. If your FID is high, clicks and taps feel laggy. If CLS is poor, buttons and images jump around, causing frustration and accidental taps. Meeting these benchmarks means your site is fast, interactive, and visually stable—qualities that keep users engaged and coming back.",
      },
      { kind: "h3", text: "Core web vitals table" },
      {
        kind: "table",
        headers: ["Metric", "Good", "Need Improvement", "Poor"],
        rows: [
          ["LCP", "≤ 2,5 s", "2,5–4 s", "> 4 s"],
          ["FID", "≤ 100 ms", "100–300 ms", "> 300 ms"],
          ["CLS", "≤ 0,1", "0,1–0,25", "> 0,25"],
        ],
      },
      { kind: "h3", text: "Actionable tips for better web vitals" },
      {
        kind: "p",
        text: "Improving your Core Web Vitals doesn’t have to be complicated. Here are a few proven strategies that can make a big difference:",
      },
      {
        kind: "list",
        items: [
          "Preload important images and fonts to speed up LCP.",
          "Minimize third-party scripts and keep JavaScript lean for better FID.",
          "Reserve space for images and ads to avoid unexpected layout shifts (better CLS).",
          "Use a performance monitoring tool to track these metrics in real time.",
        ],
      },
      { kind: "h3", text: "Example: Optimizing LCP" },
      {
        kind: "code",
        text: `<!-- Preload hero image for faster LCP -->
<link rel="preload" as="image" href="/hero.webp">`,
      },
      { kind: "h3", text: "How Jet helps" },
      {
        kind: "p",
        text: "Jet automatically audits your site for these metrics and applies optimizations, so you can focus on content, not code. With Jet, you’ll always know where your site stands—and you’ll have the tools to reach and maintain top scores for a seamless, high-performing user experience.",
      },
    ],
  },
  {
    slug: "cdn-101-why-a-global-content-delivery-network-matters",
    title: "CDN 101: Why a Global Content Delivery Network Matters",
    description:
      "Explore the benefits of using a CDN for your site’s speed, scalability, and security—and how Jet integrates it seamlessly.",
    date: "Apr 6, 2025",
    dateTime: "2025-04-06",
    category: "Infrastructure",
    image: "/blog/cdn.png",
    imageAlt: "gradient",
    authors: [daniel, grace],
    related: [
      "why-website-speed-matters-more-than-ever-in-2025",
      "image-optimization-the-secret-to-lightning-fast-sites",
    ],
    body: [
      { kind: "h3", text: "What is a CDN?" },
      {
        kind: "p",
        text: "A Content Delivery Network (CDN) is a system of distributed servers that deliver content to users based on their geographic location. Instead of every visitor connecting to a single central server, a CDN ensures that your website’s images, scripts, and other assets are loaded from the server closest to them. This leads to dramatically faster load times, especially for global audiences, and helps your site stay available even during high-traffic events.",
      },
      { kind: "h3", text: "Why does your site need a CDN?" },
      {
        kind: "p",
        text: "Imagine launching a new product and suddenly seeing a massive spike in visitors from around the globe. Without a CDN, your single server can quickly become overloaded, causing slowdowns or even outages. With a CDN, traffic is automatically balanced across many servers, ensuring a smooth and fast experience for everyone. Plus, CDNs add layers of security and redundancy that protect your site from attacks and unexpected failures.",
      },
      { kind: "h3", text: "CDN benefits table" },
      {
        kind: "table",
        headers: ["Benefit", "Description"],
        rows: [
          ["Speed", "Content loads from the nearest server"],
          ["Scalability", "Handles traffic spikes effortlessly"],
          ["Security", "DDoS protection and SSL everywhere"],
          ["Reliability", "Redundant nodes keep your site online"],
        ],
      },
      {
        kind: "quote",
        text: "Jet’s built-in CDN means our site is fast for visitors everywhere, all the time.",
      },
      { kind: "h3", text: "Example: CDN integration code" },
      {
        kind: "p",
        text: "Jet CDN integration is automatic for all users, but if you ever need to manually serve a script or asset, it’s as easy as adding this snippet:",
      },
      {
        kind: "code",
        text: `// Jet CDN integration is automatic, but here's a manual example:
<script src="https://cdn.jet.com/your-site-assets.js"></script>`,
      },
    ],
  },
  {
    slug: "from-manual-to-automatic-how-jet-simplifies-site-optimization",
    title: "From Manual to Automatic: How Jet Simplifies Site Optimization",
    description:
      "Stop wasting hours on plugins and manual tweaks. See how Jet automates performance, so you can focus on building your business.",
    date: "Jan 16, 2025",
    dateTime: "2025-01-16",
    category: "Productivity",
    image: "/blog/manual.png",
    imageAlt: "gradient",
    authors: [emma, sofia],
    related: [
      "why-website-speed-matters-more-than-ever-in-2025",
      "image-optimization-the-secret-to-lightning-fast-sites",
    ],
    body: [
      { kind: "h2", text: "The problem with manual optimization" },
      {
        kind: "p",
        text: "Traditional website optimization is a never-ending cycle of plugin updates, manual code tweaks, and troubleshooting conflicts. Each improvement—whether it’s compressing images, minifying scripts, or configuring a CDN—often requires a different tool, a new workflow, and hours of research. For many site owners, this means less time spent creating content or serving customers, and more time fighting technical fires.",
      },
      { kind: "h3", text: "The hidden costs of manual work" },
      {
        kind: "p",
        text: "Manual optimization isn’t just time-consuming; it’s easy to make mistakes or miss critical improvements. Outdated plugins can introduce security risks, and even a small misconfiguration can tank your site’s performance or break key features. Plus, with every update, there’s the risk of something else going wrong.",
      },
      { kind: "h2", text: "Jet’s Solution" },
      {
        kind: "p",
        text: "Jet takes the pain out of performance. Instead of juggling a dozen tools and processes, Jet automates every step:",
      },
      {
        kind: "list",
        items: [
          "Asset minification",
          "Image compression",
          "CDN setup",
          "Real-time performance monitoring",
          "Issue alerts",
        ],
      },
      { kind: "h3", text: "Manual vs. Jet Table" },
      {
        kind: "table",
        headers: ["Task", "Manual Approach", "With Jet"],
        rows: [
          ["Image compression", "Multiple plugins/tools", "Automatic"],
          ["Code minification", "Manual build steps", "Automatic"],
          ["CDN configuration", "Advanced setup", "One click"],
          ["Monitoring", "Third-party scripts", "Built-in"],
        ],
      },
      {
        kind: "quote",
        text: "With Jet, I spend less time fixing and more time creating. Everything just works.",
      },
      { kind: "h2", text: "The Jet difference" },
      {
        kind: "p",
        text: "With Jet, optimization is no longer a burden. You get all the benefits of a fast, secure, and scalable site—without the technical headaches. That means more time for your business, your team, and your creativity.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
