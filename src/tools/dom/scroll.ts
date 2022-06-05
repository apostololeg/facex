const METRICS_BY_AXIS = {
  horizontal: {
    size: 'offsetWidth',
    scroll: 'scrollWidth',
  },
  vertical: {
    size: 'offsetHeight',
    scroll: 'scrollHeight',
  },
};

function isScrollable(node, axis, threshold = 5) {
  const m = METRICS_BY_AXIS[axis];

  return node[m.scroll] - node[m.size] > threshold;
}

export function getScrollParent(node, axis = 'vertical') {
  if (node == null) return null;
  if (node.tagName === 'BODY' || isScrollable(node, axis)) return node;

  return getScrollParent(node.parentNode, axis);
}

export function scrollTo(elem, left, top) {
  if ('scrollBehavior' in document.documentElement.style) {
    elem.scrollTo({ left, top, behavior: 'smooth' });
    return;
  }

  elem.scrollTo(left, top);
}

export function scrollIntoView(elem, { horizontal } = {}) {
  if (!elem) return;

  const scrollParent = getScrollParent(elem);

  if (!scrollParent) return;

  const to = horizontal
    ? elem.offsetLeft + elem.offsetWidth / 2 - scrollParent.clientWidth / 2
    : elem.offsetTop + elem.offsetHeight / 2 - scrollParent.clientHeight / 2;

  scrollTo(scrollParent, 0, Math.max(0, to));
}
