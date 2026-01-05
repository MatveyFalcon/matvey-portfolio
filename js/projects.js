/* 
  HOW TO ADD A PROJECT:
  1) Put images in: assets/img/projects/project-folder/
  2) Create preview.jpg + 1.jpg, 2.jpg, ...
  3) Add a new object below.
*/

const PROJECTS = [
  {
    id: "site-1",
    category: "web", // web | info
    title: "Startup Landing Concept",
    type: "Website",
    desc: "Hero concept + full page layout for a startup product.",
    cover: "assets/img/projects/site-1/preview.jpg",
    gallery: [
      "assets/img/projects/site-1/1.jpg",
      "assets/img/projects/site-1/2.jpg",
      "assets/img/projects/site-1/3.jpg"
    ],
    task: "Create a modern landing UI for a startup and make it clear, premium and conversion-focused.",
    role: "UX/UI design, layout, typography, component structure. Worked with a dev team and an architect.",
    tools: "Figma, Photoshop"
  },
  {
    id: "site-2",
    category: "web",
    title: "E-commerce Homepage UI",
    type: "Website",
    desc: "Homepage UI concept with product blocks and clear hierarchy.",
    cover: "assets/img/projects/site-2/preview.jpg",
    gallery: [
      "assets/img/projects/site-2/1.jpg",
      "assets/img/projects/site-2/2.jpg",
      "assets/img/projects/site-2/3.jpg"
    ],
    task: "Design a clean e-commerce homepage with strong hierarchy and usability.",
    role: "UI design, grid system, responsive layout concept.",
    tools: "Figma"
  },
  {
    id: "info-1",
    category: "info",
    title: "Marketplace Poster Design",
    type: "Infographics",
    desc: "Clean promo poster with strong typography and structure.",
    cover: "assets/img/projects/info-1/preview.jpg",
    gallery: [
      "assets/img/projects/info-1/1.jpg",
      "assets/img/projects/info-1/2.jpg",
      "assets/img/projects/info-1/3.jpg"
    ],
    task: "Create an infographic poster to increase conversions and highlight key benefits.",
    role: "Visual design, layout, typography system.",
    tools: "Photoshop, Illustrator"
  }
];
