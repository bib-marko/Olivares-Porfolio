export interface ProjectItem {
  id: number;
  title: string;
  date: string;
  tech: string[];
  project: string | null;
  what_you_did: string[];
  impact: string[];
  imgUrl: string[];
  short_desc: string;
}

export const useProjectList = () => {
  const projectList: ProjectItem[] = [
    {
      id: 1,
      title: "Megabet Paradise",
      date: "Jul 2025 – Present",
      tech: [
        "Vue 3",
        "Tailwind",
        "API Integration",
        "Typescript",
        "H5 Apps",
        "Responsive Design"
      ],
      project: "Megabet Paradise Betting & Events Platform",
      what_you_did: [
        "Led frontend development initiatives, managing task assignments and mentoring junior developers in coding structure, best practices, and design principles.",
        "Developed and optimized reusable components to enhance responsive design and improve user management systems.",
        "Designed and implemented high-quality software solutions following modern frontend architecture and coding standards.",
        "Created interactive mini-games and integrated backend APIs to ensure cross-platform functionality and seamless data flow."
      ],
      impact: [
        "Improved frontend performance, stability, and responsiveness for thousands of platform users.",
        "Reduced development time through reusable UI components and standardized coding practices.",
        "Enhanced user interaction and visual experience across desktop, mobile, and H5 platforms.",
        "Strengthened team productivity through mentorship, structured task management, and coding guidance."
      ],
      imgUrl: ["/img/megabet.png"],
      short_desc: "A betting and events platform where the frontend was modernized through reusable components, responsive layouts, and interactive mini-games. Worked closely with the team to improve performance, stability, and overall user experience across responsive platform.",
    },

    {
      id: 2,
      title: "DreamPlay1 & Veda33",
      date: "Nov 2024 – Present (Contractual)",
      tech: ["Vue 3", "Tailwind", "API Integration", "H5 apps"],
      project: null,
      what_you_did: [
        "Built and improved reusable frontend components for both Web and H5 platforms.",
        "Implemented UI/UX enhancements that increased user engagement and improved app responsiveness.",
        "Integrated APIs to ensure smooth communication between backend and frontend.",
        "Ensured that all developed features followed software best practices, making the system more stable and scalable."
      ],
      impact: [
        "Improved performance and visual quality of Dream Play’s platform.",
        "Reduced development time by creating modular components.",
        "Helped maintain cross-platform consistency across desktop, mobile web, and H5 apps."
      ],
      imgUrl: ["/img/dreamplay1.png", "/img/veda33.png"],
      short_desc: "Developed and refined reusable UI components for Dream Play’s gaming platform and its affiliate project Veda33, enhancing responsiveness and visual quality across Web and H5 apps. Integrated APIs and delivered UI/UX improvements that boosted user engagement and streamlined cross-platform performance.",
    },

    {
      id: 3,
      title: "KALEADS",
      date: "Nov 2023 – Nov 2024",
      tech: ["Nuxt", "Tailwind", "GraphQL", "API Integration"],
      project: "E-Commerce Marketplace Platform",
      what_you_did: [
        "Worked both frontend and backend to build a full marketplace system.",
        "Designed UI using Nuxt UI + Tailwind, improving shopping flow and product browsing experience.",
        "Integrated GraphQL APIs, allowing smoother data communication and faster load times.",
        "Improved product listing, checkout flow, and content display."
      ],
      impact: [
        "Successfully deployed the marketplace to production.",
        "Achieved faster performance and better user experience, increasing usability.",
        "Reduced API payload issues through optimized GraphQL integration."
      ],
      imgUrl: ["/img/leads.png"],
      short_desc: "Built a full e-commerce marketplace using Nuxt and GraphQL, improving browsing, shopping, and product management experiences. Delivered both frontend and backend features while optimizing API communication for faster, smoother performance.",
    },

    {
      id: 4,
      title: "BIBVIP",
      date: "Jul 2022 – Nov 2023",
      tech: ["Vue.js", "Java", "API Integrations", "OOP", "Documentation"],
      project: null,
      what_you_did: [
        "Collaborated closely with backend developers to optimize workflows and project pipelines.",
        "Implemented multiple API integrations, following a clean and standardized development lifecycle.",
        "Helped the frontend team deliver features faster using Vue.js.",
        "Wrote and reviewed technical documentation to improve team clarity.",
        "Followed Object-Oriented Programming principles in developing features."
      ],
      impact: [
        "Helped speed up deployments and improve code quality.",
        "Enhanced internal communication between frontend and backend teams.",
        "Ensured consistency of API usage and integration across multiple projects."
      ],
      imgUrl: ["/img/bibvip.png"],
      short_desc: "Contributed to frontend development using Vue.js while integrating multiple APIs and supporting Java-based backend workflows. Improved team efficiency through clean coding, documentation, and adherence to consistent development practices.",
    },
  ];

  return { projectList };
};
