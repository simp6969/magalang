import axios from "axios";
import { getCookie } from "cookies-next";

const path = [
  { path: "/images/photo1.jpg" },
  { path: "/images/photo2.jpg" },
  { path: "/images/photo3.jpg" },
  { path: "/images/photo4.jpg" },
  { path: "/images/photo5.jpg" },
  { path: "/images/photo6.jpg" },
  { path: "/images/photo1.jpg" },
  { path: "/images/photo2.jpg" },
  { path: "/images/photo3.jpg" },
  { path: "/images/photo4.jpg" },
  { path: "/images/photo5.jpg" },
  { path: "/images/photo6.jpg" },
];
export function Data() {
  // if (getCookie("sign")) {
  //   return axios
  //     .get(
  //       "https://backend-one-lemon.vercel.app/user/photo/" + getCookie("sign")
  //     )
  //     .then((res) => {
  //       const filt = path.map((element) => {
  //         return res.data.filter((e) => e.orignalPath === element.path);
  //       });
  //       console.log(filt);
  //     });
  // } else {
  return path.map((element) => {
    return {
      path: element.path,
      clicked: true,
      id: Math.floor(Math.random() * 100000),
      solved: false,
    };
  });
  // }
}
// {
//   path: "/images/photo1.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo2.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo3.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo4.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo5.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo6.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo1.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo2.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo3.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo4.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo5.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
// {
//   path: "/images/photo6.jpg",
//   clicked: true,
//   id: Math.floor(Math.random() * 100000),
//   solved: false,
// },
