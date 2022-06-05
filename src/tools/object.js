export function clone(obj) {
  if (!obj) return {};
  return JSON.parse(JSON.stringify(obj));
}
