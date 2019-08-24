/**
 * Gist: https://gist.github.com/rgrove/5463265
 *
 * This is a modified, cross-browser version of the native `getBoundingClientRect()`
 * Which returns a bounding rect for _el_ with absolute coordinates corrected for
 * scroll positions.
 *
 * @param {Element} el HTML element
 * @return {Object} Absolute bounding rect for _el_.
 */
export default function getAbsoluteBoundingRect(el) {
  let _ = this,
    doc = document,
    win = window,
    body = doc.body,
    // pageXOffset and pageYOffset work everywhere except IE <9.
    offsetX =
      win.pageXOffset !== undefined
        ? win.pageXOffset
        : (doc.documentElement || body.parentNode || body).scrollLeft,
    offsetY =
      win.pageYOffset !== undefined
        ? win.pageYOffset
        : (doc.documentElement || body.parentNode || body).scrollTop,
    rect = el.getBoundingClientRect();

  if (el !== body) {
    var parent = el.parentNode;

    // The element's rect will be affected by the scroll positions of
    // *all* of its scrollable parents, not just the window, so we have
    // to walk up the tree and collect every scroll offset. Good times.
    // Also have to check if the parent is not null, since IE will throw
    // that in there for no apparent reason.
    while (parent !== body && parent) {
      offsetX += parent.scrollLeft;
      offsetY += parent.scrollTop;
      parent = parent.parentNode;
    }
  }

  return {
    bottom: rect.bottom + offsetY,
    height: rect.height,
    left: rect.left + offsetX,
    right: rect.right + offsetX,
    top: rect.top + offsetY,
    width: rect.width
  };
}
