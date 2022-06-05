export function getScreenSize() {
  return Math.min(document.body.offsetHeight, document.body.offsetWidth);
}

export function getCanvasSize() {
  const { offsetWidth: width, offsetHeight: height } =
    document.getElementById('canvas');
  return { width, height };
}
