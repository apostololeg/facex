export const parsePointer = e => ({
  id: e.pointerId,
  x: e.clientX,
  y: e.clientY,
});

export const rad2Deg = rad => (rad * 180) / Math.PI;
export const centerP = (c1, c2) => (c1 + c2) / 2;
export const center = ([p1, p2 = p1]) => ({
  x: centerP(p1.x, p2.x),
  y: centerP(p1.y, p2.y),
});

export function distanceBetweenPoints(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
