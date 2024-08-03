export function PhotoStorageController() {
  function defaultImages() {
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
  const rand = defaultImages().sort(() => Math.random() - 0.5);
  return rand;
}
