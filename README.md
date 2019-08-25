# FocusOverlay jQuery (DEPRECATED)

This is the jQuery version of the Focus Overlay library. This branch is no longer maintained. Please use the latest at https://github.com/mmahandev/FocusOverlay

<hr>

Plugin for creating overlays on focused elements. Inspired by NV's [Flying Focus](https://github.com/NV/flying-focus) UI concept. It was built with accessibility in mind with trigger keys and ARIA roles. [Demo](https://mmahandev.github.io/FocusOverlay/)

![Focus Overlay](http://i.imgur.com/zMFb7m4.gif)

## Installation

To install copy the files from the `dist` folder into your project:

```html
<!-- In the <head> -->
<link rel="stylesheet" type="text/css" href="/dist/focusOverlay.min.css"/>

<!-- End of <body> -->
<script type="text/javascript" src="/dist/focusOverlay.min.js"></script>
```
The CSS is small enough to copy directly from the `src` folder into your project's main CSS.

## Usage

```js
$(document).ready(function() {
    $(".site-wrapper").focusOverlay(options);
});
```

The above will append focusOverlay to the `.site-wrapper` element. The `options` is an optional parameter. See [options](#options) for more info.

By default focusOverlay will show and animate when hitting keyboard keys such as the `Tab` key. It's also preconfigured to animate via CSS transitions.

## Options

The default `options` are:

```js
{
    id: "focus-overlay", // ID added to the focus box
    activeClass: "focus-overlay-active", // Class added while the focus box is active
    animatingClass: "focus-overlay-animating", // Class added while the focus box is animating
    targetClass: "focus-overlay-target", // Class added to the target element
    zIndex: 9001, // z-index of focus box
    duration: 500, // Duration of the animatingClass (milliseconds)
    inactiveAfterDuration: false, // Removes activeClass after duration
    triggerKeys: [9, 36, 37, 38, 39, 40, 13, 32, 16, 17, 18, 27], // Tab, Arrow Keys, Enter, Space, Shift, Ctrl, Alt, ESC
    inactiveOnNonTriggerKey: true, // Make focus box inactive when a non specified key is pressed
    inactiveOnClick: true, // Make focus box inactive when a user clicks
    alwaysActive: false, // Force the box to always stay active. Overrides everything
    watchTransitionEnd: true // Reposition focus box on transitionEnd for focused elements (IE10+)
}
```

## Events

Note that bindings need to be added *before* the plugin is called. An example:

```js
// Overriding the focusOverlay target before the box moves
$(".site-wrapper").on("foBeforeMove", function(event, focusOverlay, $previousTarget, $currentTarget, $nextTarget) {
    if ($nextTarget.is(".header-btn")) {
        focusOverlay.$nextTarget = $(".header-btn.alt");
    }
}).focusOverlay();
```

Event | Params | Description
------ | -------- | -----------
foInit | event, focusOverlay | Fires after focusOverlay initializes
foBeforeMove | event, focusOverlay, $previousTarget, $currentTarget, $nextTarget | Fires before focusOverlay begins its duration timer
foAfterMove | event, focusOverlay, $previousTarget, $currentTarget | Fires after focusOverlay's duration timer is finished
foDestroyed | event, focusOverlay | Fires after focusOverlay is destroyed

## Methods

```js
// Example use of the "moveFocusBox" method
$(".site-wrapper").focusOverlay("moveFocusBox", $("#element"));
```

### Destroy

**Arguments:** none

Deconstructs the focusOverlay instance

### moveFocusBox

**Arguments:** jQuery Selector

Moves the focusBox to a target element

## Data Attribute Settings

In some cases you might want focusOverlay to ignore certain elements, or focus **other** elements instead. There are a few options available:

### Example usage for `data-focus`:

```html
<div id="input-wrapper">
    <input type="text" data-focus="#input-wrapper">
</div>
```

In this example when the user focuses the input, focusOverlay will instead target the wrapper. The `data-focus` attribute accepts a jQuery selector string.

### Example usage for `data-focus-label`:

```html
<label for="stylized-checkbox" class="rounded-checkbox">Click me</label>
<input id="stylized-checkbox" type="checkbox" class="visually-hidden" data-focus-label>
```

In this example when the user focuses the input, focusOverlay will instead target its associated label.

### Example usage for `data-focus-ignore`:

```html
<a href="/info.html" data-focus-ignore>Really important information here!</a>
```

In this example focusOverlay will not target this element at all.

## Browser support

FocusOverlay works on IE9+ in addition to other modern browsers such as Chrome, Firefox, and Safari. See [notes](#notes) for exceptions.

## Dependencies

jQuery 1.7

## Notes

* If you would like to *fully* support older browsers such as IE9-10 then `inactiveOnClick` must be set to `true`. Since these older browsers do not support the CSS `pointer-events: none` people would not be able to click elements under the focus box with it being always active.

* `watchTransitionEnd` is disabled by default on browsers that doesn't support the `transitionEnd` event (IE9).

#### Todo

* Examples page
* I would like to remove jQuery as a dependency entirely