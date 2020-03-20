import React from 'react';

export function isElement(element) {
  return React.isValidElement(element);
}

export function isCompositeTypeElement(element) {
  return isElement(element) && typeof element.type === 'function';
}

export function filterChildrenElements(children, compare) {
  const isElementCompare = (obj) => {
    if (Array.isArray(compare)) {
      return obj && isCompositeTypeElement(obj) && compare.indexOf(obj.type) >= 0;
    }
    return obj && isCompositeTypeElement(obj) && obj.type === compare;
  };

  const elements = React.Children.toArray(children);
  return elements.filter(isElementCompare);
}
