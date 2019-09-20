// https://stackoverflow.com/a/32623832/8862005
export default function absolutePosition(el) {
  var found,
    left = 0,
    top = 0,
    width = 0,
    height = 0,
    offsetBase = absolutePosition.offsetBase;
  if (!offsetBase && document.body) {
    offsetBase = absolutePosition.offsetBase = document.createElement('div');
    offsetBase.style.cssText = 'position:absolute;left:0;top:0';
    document.body.appendChild(offsetBase);
  }
  if (
    el &&
    el.ownerDocument === document &&
    'getBoundingClientRect' in el &&
    offsetBase
  ) {
    var boundingRect = el.getBoundingClientRect();
    var baseRect = offsetBase.getBoundingClientRect();
    found = true;
    left = boundingRect.left - baseRect.left;
    top = boundingRect.top - baseRect.top;
    width = boundingRect.right - boundingRect.left;
    height = boundingRect.bottom - boundingRect.top;
  }
  return {
    found: found,
    left: left,
    top: top,
    width: width,
    height: height,
    right: left + width,
    bottom: top + height
  };
}
