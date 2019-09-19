# Focus Overlay

Library for creating overlays on focused elements. It was built with accessibility in mind with trigger keys and ARIA roles.

![Focus Overlay](http://i.imgur.com/zMFb7m4.gif)

## Install

Install with npm:

```bash
npm install focus-overlay
```

Install in browser:

<!-- prettier-ignore -->
```html
<!-- In the <head> -->
<link rel="stylesheet" href="//unpkg.com/focus-overlay@latest/dist/focusoverlay.css" />

<!-- End of <body> -->
<script src="//unpkg.com/focus-overlay@latest/dist/focusoverlay.js"></script>
```

The CSS is small enough to copy directly into your project's main stylesheet if you desire.

## Usage

`FocusOverlay(element, options)`

```js
import FocusOverlay from 'focusoverlay';

// Zero config - Scopes to <body> element and uses default settings
const fo = new FocusOverlay();

// Or define an element
const fo = new FocusOverlay(document.body, options);

// Or define a CSS selector string
const fo = new FocusOverlay('body#site-container', options);
```

The `element` is what FocusOverlay will be scoped to. It takes either a string CSS selector or an HTML element. If no element is supplied it will scope to the `<body>` element by default.

The `options` is an optional parameter. See [options](#options) for more info.

By default Focus Overlay will show and animate when hitting keyboard keys such as the `Tab` key. It's also preconfigured to animate via CSS transitions.

## Options

The default `options` are:

```js
// Class added to the focus box
class: 'focus-overlay',
// Class added while the focus box is active
activeClass: 'focus-overlay-active',
// Class added while the focus box is animating
animatingClass: 'focus-overlay-animating',
// Class added to the target element
targetClass: 'focus-overlay-target',
// z-index of focus box
zIndex: 9001,
// Duration of the animatingClass (milliseconds)
duration: 500,
// Removes activeClass after duration
inactiveAfterDuration: false,
// Tab, Arrow Keys, Enter, Space, Shift, Ctrl, Alt, ESC
triggerKeys: [9, 36, 37, 38, 39, 40, 13, 32, 16, 17, 18, 27],
// Make focus box inactive when a non specified key is pressed
inactiveOnNonTriggerKey: true,
// Make focus box inactive when a user clicks
inactiveOnClick: true,
// Force the box to always stay active. Overrides everything
alwaysActive: false,
// Reposition focus box on transitionEnd for focused elements
watchTransitionEnd: true,
// Initialization event
onInit: function(focusoverlay) {},
// Before focus box move
onBeforeMove: function(focusoverlay) {},
// After focus box move
onAfterMove: function(focusoverlay) {},
// After FocusOverlay is destroyed
onDestroy: function(focusoverlay) {}
```

## Methods

```js
// Example use of the "moveFocusBox" method
focusoverlay.moveFocusBox(document.querySelector('body'));
```

### moveFocusBox

**Arguments:** Element

Moves the focusBox to a target element

### Destroy

**Arguments:** None

Deconstructs the FocusOverlay instance

## Data Attribute Settings

In some cases you might want FocusOverlay to ignore certain elements, or focus **other** elements instead. There are a few options available:

### Example usage for `data-focus`:

```html
<div id="input-wrapper">
  <input type="text" data-focus="#input-wrapper" />
</div>
```

In this example when the user focuses the input, FocusOverlay will instead target the wrapper. The `data-focus` attribute accepts a querySelector string.

### Example usage for `data-focus-label`:

```html
<label for="stylized-checkbox" class="rounded-checkbox">Click me</label>
<input
  id="stylized-checkbox"
  type="checkbox"
  class="visually-hidden"
  data-focus-label
/>
```

In this example when the user focuses the input, FocusOverlay will instead target its associated label.

### Example usage for `data-focus-ignore`:

```html
<a href="/info.html" data-focus-ignore>Really important information here!</a>
```

In this example FocusOverlay will not target this element at all.

## Browser support

Focus Overlay works on all modern browsers including IE11.

## Notes

- Special thanks to NV as it was inspired by his [Flying Focus](https://github.com/NV/flying-focus) UI concept.
- The jQuery version is still available at in the [jQuery](https://github.com/mmahandev/FocusOverlay/tree/jquery) branch. It is no longer mantained.

#### Todo

- Make zIndex be CSS only
- Add refreshPosition method
- Add currentTarget var
