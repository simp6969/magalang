let defaultImages = [
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card1.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card2.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card3.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card4.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card5.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card6.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card1.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card2.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card3.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card4.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card5.jpg" },
  { id: Math.floor(Math.random() * 1000000), path: "/cards/card6.jpg" },
];

function simplify() {
  let to_return = [];
  for (let i = 1; i <= 6; i++) {
    to_return.push({
      id: Math.floor(Math.random() * 1000000),
      path: "/cards/card" + i + ".jpg",
    });
  }
  for (let e = 1; e <= 6; e++) {
    to_return.push({
      id: Math.floor(Math.random() * 1000000),
      path: "/cards/card" + e + ".jpg",
    });
  }
  return to_return;
}

console.log(simplify());
