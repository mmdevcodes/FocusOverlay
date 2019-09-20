import './styles.css';
import './polyfills/closest';
import extend from './utils/extend';
import absolutePosition from './utils/absolutePosition';
import whichTransitionEvent from './utils/whichTransitionEvent';

/**
 * The plugin constructor
 * @param {Element|String} element The DOM element where plugin is applied
 * @param {Object} options Options passed to the constructor
 */
export default class FocusOverlay {
  constructor(element, options) {
    this.active = false;
    this.scopedEl;
    this.focusBox;
    this.previousTarget;
    this.nextTarget;
    this.timeout = 0;
    this.inScope = false;
    this.transitionEvent = whichTransitionEvent();
    this.options = extend(
      {
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
        onInit: function() {},
        // Before focus box move
        onBeforeMove: function() {},
        // After focus box move
        onAfterMove: function() {},
        // After FocusOverlay is destroyed
        onDestroy: function() {}
      },
      options || {}
    );

    /**
     * Setup main scoped element. First expect a DOM element, then
     * fallback to a string querySelector, and finally fallback to <body>
     */
    if (element instanceof Element) {
      this.scopedEl = element;
    } else if (typeof element === 'string' || element instanceof String) {
      this.scopedEl = document.querySelector(element);
    } else {
      this.scopedEl = document.querySelector('body');
    }

    // Binding
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.moveFocusBox = this.moveFocusBox.bind(this);
    this.stop = this.stop.bind(this);

    // Initialize
    this.init();
  }

  /**
   * Initialize the plugin instance. Add event listeners
   * to the window depending on which options are enabled.
   */
  init() {
    if (this.options.alwaysActive) {
      this.active = true;
      window.addEventListener('focusin', this.onFocusHandler, true);
    } else {
      window.addEventListener('keydown', this.onKeyDownHandler, false);

      if (this.options.inactiveOnClick) {
        window.addEventListener('mousedown', this.stop, false);
      }
    }

    this._createFocusBox();
    this.options.onInit(this);
  }

  /**
   * Handler method for the keydown event
   * @param {Event}
   */
  onKeyDownHandler(e) {
    const code = e.which;

    // Checks if the key pressed is in the triggerKeys array
    if (this.options.triggerKeys.includes(code)) {
      if (this.active === false) {
        this.active = true;
        window.addEventListener('focusin', this.onFocusHandler, true);
      }

      /**
       * Iframes don't trigger a focus event so I hacked this check in there.
       * Slight delay on the setTimeout for cross browser reasons.
       * See https://stackoverflow.com/a/28932220/8862005
       */
      setTimeout(() => {
        const activeEl = document.activeElement;

        /**
         * Check if the active element is an iframe, is part of
         * the scope, and that focusOverlay is currently active.
         */
        if (
          activeEl instanceof HTMLIFrameElement &&
          this.scopedEl.contains(activeEl) &&
          this.active === true
        ) {
          this.moveFocusBox(activeEl);
        }
      }, 5);
    } else if (this.options.inactiveOnNonTriggerKey) {
      this.stop();
    }
  }

  /**
   * Creates the focusBox DIV element and appends itself to the DOM
   */
  _createFocusBox() {
    this.focusBox = document.createElement('div');
    this.focusBox.setAttribute('aria-hidden', 'true');
    this.focusBox.classList.add(this.options.class);

    Object.assign(this.focusBox.style, {
      position: 'absolute',
      zIndex: this.options.zIndex,
      pointerEvents: 'none'
    });

    this.scopedEl.insertAdjacentElement('beforeend', this.focusBox);
  }

  /**
   * Cleanup method that runs whenever variables,
   * methods, etc. needs to be refreshed.
   */
  _cleanup() {
    // Remove previous target's classes and event listeners
    if (this.nextTarget != null) {
      this.previousTarget = this.nextTarget;
      this.previousTarget.classList.remove(this.options.targetClass);
      this.previousTarget.removeEventListener(
        this.transitionEvent,
        this.moveFocusBox
      );
    }
  }

  /**
   * Handler method for the focus event
   * @param {Event}
   */
  onFocusHandler(e) {
    const focusedEl = e.target;

    this._cleanup();

    // If the focused element is a child of the main element
    if (this.scopedEl.contains(focusedEl)) {
      // Variable to be added to onBeforeMove event later
      const currentEl = this.nextTarget;

      this.inScope = true;

      // If the focused element has data-focus then assign a new $target
      if (focusedEl.getAttribute('data-focus') !== null) {
        const focusSelector = focusedEl.getAttribute('data-focus');

        this.nextTarget = document.querySelector(
          `[data-focus='${focusSelector}']`
        );

        // If the focused element has data-focus-label then focus the associated label
      } else if (focusedEl.getAttribute('data-focus-label') !== null) {
        let associatedEl = document.querySelector(`[for='${focusedEl.id}']`);

        // If there is no label pointing directly to the focused element, then point to the wrapping label
        if (associatedEl === null) {
          associatedEl = focusedEl.closest('label');
        }

        this.nextTarget = associatedEl;

        // If the focused element has data-ignore then stop
      } else if (focusedEl.getAttribute('data-focus-ignore') !== null) {
        return;

        // If none of the above is true then set the target as the currently focused element
      } else {
        this.nextTarget = focusedEl;
      }

      /**
       * Clear the timeout of the duration just in case if the
       * user focuses a new element before the timer runs out.
       */
      clearTimeout(this.timeout);

      /**
       * If transitionEnd is supported and watchTransitionEnd is enabled
       * add a check to make the focusBox recalculate its position
       * if the focused element has a long transition on focus.
       */
      if (this.transitionEvent && this.options.watchTransitionEnd) {
        this.nextTarget.addEventListener(
          this.transitionEvent,
          this.moveFocusBox
        );
      }

      this.options.onBeforeMove(currentEl, this.nextTarget, this);
      this.moveFocusBox(this.nextTarget);

      // If the focused element is a child of the main element but alwaysActive do nothing
    } else if (this.options.alwaysActive) {
      this.inScope = false;

      // If the element focused is not a child of the main element stop being active
    } else {
      this.inScope = false;
      this.stop();
    }
  }

  /**
   * Ends the active state of the focusBox
   */
  stop() {
    this.active = false;
    window.removeEventListener('focusin', this.onFocusHandler, true);
    this._cleanup();
    this.focusBox.classList.remove(this.options.activeClass);
  }

  /**
   * Moves the focusBox to a target element
   * @param {Element|Event} targetEl
   */
  moveFocusBox(targetEl) {
    // When passed as a handler we'll get the event target
    if (targetEl instanceof Event) targetEl = document.activeElement;

    // Marking current element as being targeted
    targetEl.classList.add(this.options.targetClass);

    /**
     * Check to see if what we're targeting is actually still there.
     * Then check to see if we're targeting a DOM element. There was
     * an IE issue with the document and window sometimes being targeted
     * and throwing errors since you can't get the position values of those.
     */
    if (document.body.contains(targetEl) && targetEl instanceof Element) {
      const rect = absolutePosition(targetEl);
      const width = `${rect.width}px`;
      const height = `${rect.height}px`;
      const left = `${rect.left}px`;
      const top = `${rect.top}px`;

      this.focusBox.classList.add(this.options.animatingClass);
      this.focusBox.classList.add(this.options.activeClass);

      Object.assign(this.focusBox.style, {
        width,
        height,
        left,
        top
      });

      // Remove animating/active class after the duration ends.
      this.timeout = setTimeout(() => {
        this.focusBox.classList.remove(this.options.animatingClass);

        if (this.options.inactiveAfterDuration) {
          this.focusBox.classList.remove(this.options.activeClass);
        }

        this.options.onAfterMove(this.previousTarget, targetEl, this);
      }, this.options.duration);
    } else {
      this._cleanup();
    }
  }

  /**
   * The destroy method to free resources used by the plugin:
   * References, unregister listeners, etc.
   */
  destroy() {
    // Remove focusBox
    this.focusBox.parentNode.removeChild(this.focusBox);

    // Remove any extra classes given to other elements if they exist
    this.previousTarget != null &&
      this.previousTarget.classList.remove(this.options.targetClass);
    this.nextTarget != null &&
      this.nextTarget.classList.remove(this.options.targetClass);

    // Remove event listeners
    window.removeEventListener('focusin', this.onFocusHandler, true);
    window.removeEventListener('keydown', this.onKeyDownHandler, false);
    window.removeEventListener('mousedown', this.stop, false);

    this.options.onDestroy(this);
  }
}
