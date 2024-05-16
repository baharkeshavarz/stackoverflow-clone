import { SidebarLink } from "@/types/index";

export const themes = [
  {
    value: "light",
    label: "Light",
    icon: "/assets/icons/sun.svg",
  },
  {
    value: "dark",
    label: "Dark",
    icon: "/assets/icons/moon.svg",
  },
  {
    value: "system",
    label: "System",
    icon: "/assets/icons/computer.svg",
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQL",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "",
    },
    upvotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date("2023-12-09T09:28:06.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      { _id: "1", name: "css" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "2",
      name: "Bahar Keshavarz",
      picture: "",
    },
    upvotes: 5,
    views: 200,
    answers: [],
    createdAt: new Date("2024-01-05T04:28:06.000Z"),
  },
  {
    _id: "3",
    title: "How to center a nav?",
    tags: [
      { _id: "1", name: "css" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "2",
      name: "Bahar Keshavarz",
      picture: "",
    },
    upvotes: 534,
    views: 750000,
    answers: [],
    createdAt: new Date("2024-01-12T04:28:06.000Z"),
  },
  {
    _id: "4",
    title: "How to center a nav before?",
    tags: [
      { _id: "1", name: "css" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "2",
      name: "Bahar Keshavarz",
      picture: "",
    },
    upvotes: 25000000,
    views: 185,
    answers: [{}, {}],
    createdAt: new Date("2020-01-12T04:28:06.000Z"),
  },
];
