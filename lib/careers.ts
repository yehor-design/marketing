export type CareerSlug =
  | "frontend-developer"
  | "backend-developer"
  | "devops-engineer"
  | "design-engineer"
  | "product-designer"
  | "marketing-lead"
  | "customer-success-specialist"
  | "wildcard";

export type BenefitIconName =
  | "health"
  | "remote"
  | "time"
  | "learning"
  | "tools"
  | "events";

export type Benefit = {
  title: string;
  body: string;
  icon: BenefitIconName;
};

export const benefits: Benefit[] = [
  {
    title: "Health & wellness",
    body: "Comprehensive health coverage and wellness support.",
    icon: "health",
  },
  {
    title: "Remote flexibility",
    body: "Work from anywhere—Jet is a remote-first team.",
    icon: "remote",
  },
  {
    title: "Generous time off",
    body: "Recharge with flexible vacation and paid holidays.",
    icon: "time",
  },
  {
    title: "Learning & growth",
    body: "Annual budget for courses, conferences, and personal development.",
    icon: "learning",
  },
  {
    title: "Tools & tech",
    body: "Latest hardware and software to help you do your best work.",
    icon: "tools",
  },
  {
    title: "Team events",
    body: "Virtual and in-person meetups to connect and have fun",
    icon: "events",
  },
];

export type CareerRole = {
  slug: CareerSlug;
  title: string;
  department: string;
  location: string;
  summary: string;
  duties: string[];
  requirements: string[];
  offer: string[];
};

export const careers: CareerRole[] = [
  {
    slug: "marketing-lead",
    title: "Marketing Lead",
    department: "Growth",
    location: "Remote",
    summary:
      "We're looking for a Marketing Lead to drive Jet’s growth through creative campaigns and data-driven strategies.",
    duties: [
      "Develop and execute marketing strategies",
      "Manage digital campaigns and content",
      "Analyze performance and optimize for growth",
      "Collaborate with product and design teams",
    ],
    requirements: [
      "Proven experience in SaaS or tech marketing",
      "Strong analytical and creative skills",
      "Excellent communicator and team player",
      "Results-driven and adaptable",
    ],
    offer: [
      "Competitive compensation",
      "Remote work flexibility",
      "Budget for tools and learning",
      "Fast-paced, collaborative team",
    ],
  },
  {
    slug: "customer-success-specialist",
    title: "Customer Success Specialist",
    department: "Growth",
    location: "Remote",
    summary:
      "We're looking for a Customer Success Specialist to help users get the most out of Jet and ensure their success.",
    duties: [
      "Onboard and support new customers",
      "Troubleshoot issues and provide guidance",
      "Gather user feedback for product improvement",
      "Build lasting relationships with users",
    ],
    requirements: [
      "Excellent communication and problem-solving skills",
      "Empathetic, patient, and user-focused",
      "Experience in SaaS or tech support is a plus",
      "Organized and proactive",
    ],
    offer: [
      "Competitive salary",
      "Flexible remote work",
      "Opportunities for growth",
      "Supportive team culture",
    ],
  },
  {
    slug: "design-engineer",
    title: "Design Engineer",
    department: "Design",
    location: "Remote",
    summary:
      "We're looking for a Design Engineer to bridge design and development, bringing interactive prototypes and polished UI to life.",
    duties: [
      "Build interactive prototypes and design systems",
      "Collaborate with designers and developers",
      "Ensure design consistency across products",
      "Implement UI components with pixel-perfect accuracy",
    ],
    requirements: [
      "Experience with both design tools and frontend code",
      "Passion for detail and user experience",
      "Strong collaboration and communication skills",
      "Curious and eager to learn new tech",
    ],
    offer: [
      "Competitive pay",
      "Remote-first culture",
      "Professional development budget",
      "Creative, fast-moving team",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    summary:
      "We're looking for a Product Designer to craft beautiful, user-friendly experiences that make site optimization effortless.",
    duties: [
      "Design intuitive interfaces and user flows",
      "Work closely with product and engineering teams",
      "Conduct user research and usability testing",
      "Iterate quickly based on feedback",
    ],
    requirements: [
      "Strong portfolio showcasing digital products",
      "Skilled in Figma or similar tools",
      "User-focused, detail-oriented, and creative",
      "Collaborative and open to feedback",
    ],
    offer: [
      "Competitive salary",
      "Flexible remote work",
      "Learning & growth opportunities",
      "Supportive, creative environment",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    summary:
      "We're looking for a DevOps Engineer to automate, monitor, and scale our infrastructure for peak performance.",
    duties: [
      "Manage and optimize CI/CD pipelines",
      "Automate deployment and monitoring",
      "Ensure uptime, reliability, and security",
      "Collaborate with developers for seamless releases",
    ],
    requirements: [
      "Experience with AWS, GCP, or Azure",
      "Skilled in automation tools (Docker, Kubernetes, Terraform)",
      "Strong scripting and troubleshooting skills",
      "Security-first mindset",
    ],
    offer: [
      "Competitive compensation",
      "Remote work flexibility",
      "Hardware & software of your choice",
      "Team events and wellness benefits",
    ],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote (EU time)",
    summary:
      "We're looking for a Backend Developer to power the core of Jet’s optimization engine and deliver reliable, scalable solutions.",
    duties: [
      "Build and maintain scalable backend services",
      "Optimize APIs for speed and reliability",
      "Collaborate with frontend and DevOps teams",
      "Ensure security and data integrity",
    ],
    requirements: [
      "Solid experience with Node.js, Python, or Go",
      "Strong knowledge of databases and cloud infrastructure",
      "Problem-solver with a focus on performance",
      "Comfortable working in a remote team",
    ],
    offer: [
      "Competitive salary and bonuses",
      "Flexible remote work",
      "Annual learning stipend",
      "Supportive, fast-moving team",
    ],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote (EU time)",
    summary:
      "We're looking for a Frontend Developer to build fast, intuitive interfaces that delight users and drive performance.",
    duties: [
      "Develop and optimize responsive web applications",
      "Collaborate with designers and backend engineers",
      "Implement best practices for performance and accessibility",
      "Ship high-quality features quickly",
    ],
    requirements: [
      "Strong experience with React or similar frameworks",
      "Passionate about web performance and UX",
      "Excellent communication and teamwork skills",
      "Proactive, self-motivated, and detail-oriented",
    ],
    offer: [
      "Competitive salary and performance bonuses",
      "Remote work flexibility",
      "Learning and development budget",
      "Generous time off and wellness support",
    ],
  },
  {
    slug: "wildcard",
    title: "Wildcard",
    department: "Any",
    location: "Remote",
    summary:
      "We're looking for exceptional people who are passionate about speed, performance, and making the web better—even if your dream role isn’t listed.",
    duties: [
      "Tell us how you’d like to contribute to Jet",
      "Collaborate across teams to solve real problems",
      "Bring your unique skills and ideas to the table",
      "Help shape the future of web performance",
    ],
    requirements: [
      "Motivated self-starter with a growth mindset",
      "Strong communicator and team player",
      "Passionate about web technology and user experience",
      "Ready to make an impact in a fast-moving team",
    ],
    offer: [
      "Competitive compensation",
      "Flexible, remote-first work",
      "Learning and growth opportunities",
      "Supportive, innovative team culture",
    ],
  },
];

const bySlug = new Map(careers.map((role) => [role.slug, role]));

export function getCareer(slug: string): CareerRole | undefined {
  return bySlug.get(slug as CareerSlug);
}
