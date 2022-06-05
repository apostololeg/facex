const METRICS_BY_AXIS = {
  horizontal: {
    size: 'offsetWidth',
    scroll: 'scrollWidth'
  },
  vertical: {
    size: 'offsetHeight',
    scroll: 'scrollHeight'
  }
};

function isScrollableWithTresh(node, axis, threshold = 5) {
  const m = METRICS_BY_AXIS[axis];

  return node[m.scroll] - node[m.size] > threshold;
}

function isScrollable(node, axis) {
  if (!axis)
    return (
      isScrollableWithTresh(node, 'vertical') ||
      isScrollableWithTresh(node, 'horizontal')
    );

  return isScrollableWithTresh(node, axis);
}

export function getScrollParent(node, axis) {
  if (node == null) return null;
  if (node.tagName === 'BODY' || isScrollable(node, axis)) return node;

  return getScrollParent(node.parentNode, axis);
}

export default {};
