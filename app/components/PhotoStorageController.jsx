export function PhotoStorageController() {
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
  defaultImages.sort(() => Math.random() - 0.5);
  return defaultImages;
}
