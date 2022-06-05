export function indexWhere(arr, val, fieldName) {
  if (!fieldName) {
    return arr.indexOf(val);
  }

  const check =
    typeof fieldName === 'function'
      ? fieldName
      : item => item[fieldName] === val;

  let index = -1;

  arr.some((item, i) => {
    if (check(item)) {
      index = i;
      return true;
    }
    return false;
  });

  return index;
}

export function sliceWhere([...arr], val, fieldName) {
  const index = indexWhere(arr, val, fieldName);

  if (index > -1) arr.splice(index, 1);
  return arr;
}

export function spliceWhere(arr, val, fieldName?) {
  const index = indexWhere(arr, val, fieldName);

  if (index > -1) arr.splice(index, 1);
}

export function addUniq(arr, val: any | any[], fieldName?) {
  if (Array.isArray(val)) {
    val.forEach(v => addUniq(arr, v, fieldName));
    return;
  }

  const index = indexWhere(arr, val, fieldName);

  if (index === -1) arr.push(val);
}

export function sortByField(arr, fieldName, f = str => str) {
  return arr.sort((a, b) =>
    f(a[fieldName]) > f(b[fieldName])
      ? 1
      : f(b[fieldName]) > f(a[fieldName])
      ? -1
      : 0
  );
}

export function groupByField(arr, fieldName) {
  return arr.reduce((acc, item) => {
    const field = item[fieldName];
    if (!acc[field]) acc[field] = [];
    acc[field].push(item);
    return acc;
  }, {});
}
