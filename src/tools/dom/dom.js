import { fn } from 'moment';

export * from './getScrollParent';

export function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}

export function hasParent(elem, parentElem) {
  const isEqual = elem === parentElem;

  if (isEqual || elem.nodeName === 'BODY') {
    return isEqual;
  }

  return hasParent(elem.parentNode, parentElem);
}
