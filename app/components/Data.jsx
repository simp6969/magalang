import { getCookie } from "cookies-next";

export const Data = [
  getCookie("customPhoto")
    ? getCookie("customPhoto")
    : {
        path: "/images/photo1.jpg",
        clicked: true,
        id: Math.floor(Math.random() * 100000),
        solved: false,
      },
  {
    path: "/images/photo2.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo3.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo4.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo5.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo6.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo1.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo2.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo3.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo4.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo5.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
  {
    path: "/images/photo6.jpg",
    clicked: true,
    id: Math.floor(Math.random() * 100000),
    solved: false,
  },
];
