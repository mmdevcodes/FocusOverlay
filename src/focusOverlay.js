/*! ________________ 
*   ___  ____/_  __ \
*   __  /_   _  / / /
*   _  __/   / /_/ / 
*   /_/      \____/  
*   Focus Overlay
* 
*  Version: 0.0.1
*  Author: Maurice Mahan
*  License: MIT
*  Repo: https://github.com/MauriceMahan/FocusOverlay
*/

;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], function($) {
            return factory($, window);
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery, window);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery, window);
    }
}(function($, window) { 
    /**
     * The plugin constructor
     * @param {DOM Element} element The DOM element where plugin is applied
     * @param {Object} options Options passed to the constructor
     */
    function focusOverlay(element, options) {
        var _ = this;

        _.active = false;
        _.el = element;
        _.$el = $(element);
        _.$focusBox = $("<div aria-hidden='true' />");
        _.$previousTarget;
        _.$target;
        _.timeout = 0;

        // Set the instance options extending the plugin defaults and
        // the options passed by the user
        _.options = $.extend({}, $.fn.focusOverlay.defaults, options);

        // Add in proxies so _ scope ties to this function even when called via outside event bindings, etc.
        _.onFocusHandler = $.proxy(_.onFocusHandler, _);
        _.createFocusBox = $.proxy(_.createFocusBox, _);
        _.onKeyDownHandler = $.proxy(_.onKeyDownHandler, _);
        _.animateFocusBox = $.proxy(_.animateFocusBox, _);
        _.cleanup = $.proxy(_.cleanup, _);
        _.stop = $.proxy(_.stop, _);
        _.destroy = $.proxy(_.destroy, _);

        // Initialize the plugin instance
        _.init();
    }

    /**
     * Set up focusOverlay prototype with desired methods.
     */
    focusOverlay.prototype = {
        /**
         * Initialize the plugin instance. Add event listeners
         * to the window depending on which options are enabled.
         */
        init: function() {
            var _ = this;
            
            if (_.options.alwaysActive) {
                _.active = true;
                window.addEventListener("focus", _.onFocusHandler, true);
            } else {
                window.addEventListener("keydown", _.onKeyDownHandler, false);

                if (_.options.inactiveOnClick) {
                    window.addEventListener("click", _.stop, false);
                }
            }

            _.createFocusBox();
            _.$el.trigger("foInit", [_]);
        },

        /**
         * Handler method for the keydown event
         * @param {Event}
         */
        onKeyDownHandler: function(e) {
            var _ = this,
                code = e.which;

            // Checks if the key pressed is in the triggerKeys array
            if ($.inArray(code, _.options.triggerKeys) >= 0) {
                if (_.active === false) {
                    _.active = true;
                    window.addEventListener("focus", _.onFocusHandler, true);
                }
            } else if (_.options.inactiveOnNonTriggerKey) {
                _.stop();
            }
        },

        /**
         * Creates the focusBox DIV element and appends itself to the DOM
         */
        createFocusBox: function() {
            var _ = this;
            
            _.$focusBox.appendTo(_.$el)
                .attr("id", _.options.id)
                .css({
                    position: "absolute",
                    zIndex: _.options.zIndex,
                    pointerEvents: "none"
                });
        },

        /**
         * Cleanup method that runs whenever variables,
         * methods, etc. needs to be refreshed.
         */
        cleanup: function() {
            var _ = this;
          
            // Remove previous target's class
            if (_.$target != null) {
                _.$previousTarget = _.$target;
                _.$previousTarget.removeClass(_.options.targetClass);
            }
        },

        /**
         * Handler method for the focus event
         * @param {Event}
         */
        onFocusHandler: function(e) {
            var _ = this,
                $focus = $(e.target);

            _.cleanup();

            /**
             * If the target has a focus data attribute
             * then focus that element instead. Otherwise
             * check if the element is supposed to be
             * ignored. Otherwise just use the focused element.
             */
            if ($focus.data("focus")) {
                _.$target = $($focus.data("focus"))
            } else if ($focus.data("focus-ignore")) {
                return;
            } else {
                _.$target = $focus;
            }

            _.$target.addClass(_.options.targetClass);

            clearTimeout(_.timeout);
            _.animateFocusBox(_.$target);
        },

        /**
         * Ends the active state of the focusBox 
         */
        stop: function() {
            var _ = this;
            
            _.active = false;
            window.removeEventListener("focus", _.onFocusHandler, true);
            _.cleanup();
            _.$focusBox.removeClass(_.options.activeClass);
        },

        /**
         * Moves the focusBox to a target element
         * @param {jQuery Object}
         */
        animateFocusBox: function($target) {
            var _ = this;
            
            /**
             * Check to see if what we're targetting is actually still there.
             * Then check to see if we're targetting a DOM element. There was
             * an issue with the document and window sometimes being targetting
             * and throwing errors since you can't get the position values of those.
             */
            if ($target.length > 0 && $target[0] instanceof Element) {
                _.$el.trigger("foBeforeDurationTimer", [_, _.$previousTarget, $target]);

                var rect = _._getAbsoluteBoundingRect($target[0]),
                    width = rect.width,
                    height = rect.height,
                    left = rect.left,
                    top = rect.top;


                _.$focusBox.addClass(_.options.animatingClass)
                    .addClass(_.options.activeClass)
                    .css({
                        width: width,
                        height: height,
                        left: left,
                        top: top
                    });

                _.timeout = setTimeout(function() {
                    _.$focusBox.removeClass(_.options.animatingClass);

                    if (_.options.inactiveAfterDuration) {
                        _.$focusBox.removeClass(_.options.activeClass);
                    }
                    
                    _.$el.trigger("foAfterDurationTimer", [_, _.$previousTarget, $target]);
                }, _.options.duration);
            } else {
                _.cleanup();
            }
        },

        /**
         * The destroy method to free resources used by the plugin:
         * References, unregister listeners, etc.
         */
        destroy: function() {
            var _ = this;

            // Remove any attached data from your plugin
            _.$el.removeData();

            // Remove focusBox
            _.$focusBox.remove();

            // Remove any extra classes given to other elements if they exist
            (_.$previousTarget != null) && _.$previousTarget.removeClass(_.options.targetClass);
            (_.$target != null) && _.$target.removeClass(_.options.targetClass);

            // Remove event listeners
            window.removeEventListener("focus", _.onFocusHandler, true);
            window.removeEventListener("keydown", _.onKeyDownHandler, false);
            window.removeEventListener("click", _.stop, false);
        },

        /**
         * Gist: https://gist.github.com/rgrove/5463265
         * 
         * This is a modified, cross-browser version of the native `getBoundingClientRect()`
         * Which returns a bounding rect for _el_ with absolute coordinates corrected for
         * scroll positions.
         * 
         * @param {HTMLElement} el HTML element
         * @return {Event} Absolute bounding rect for _el_.
         */
        _getAbsoluteBoundingRect: function (el) {
            var _ = this,
                doc = document,
                win = window,
                body = doc.body,

                // pageXOffset and pageYOffset work everywhere except IE <9.
                offsetX = win.pageXOffset !== undefined ? win.pageXOffset :
                    (doc.documentElement || body.parentNode || body).scrollLeft,
                offsetY = win.pageYOffset !== undefined ? win.pageYOffset :
                    (doc.documentElement || body.parentNode || body).scrollTop,

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
    };
    
    $.fn.focusOverlay = function (options) {
        var args = arguments;

        /**
         * Creates a new plugin instance, for each selected element,
         * and stores a reference within the element's data
         */
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + focusOverlay)) {
                    $.data(this, 'plugin_' + focusOverlay, new focusOverlay(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            /**
             * Call a public plugin method (not starting
             * with an underscore) for each selected element.
             */
            if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn.focusOverlay.getters) != -1) {
                /**
                 * If the user does not pass any arguments and the method
                 * allows to work as a getter then break the chainability
                 * so we can return a value instead of the element reference.
                 */
                var instance = $.data(this[0], 'plugin_' + focusOverlay);
                return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            } else {
                // Invoke the specified method on each selected element
                return this.each(function () {
                    var instance = $.data(this, 'plugin_' + focusOverlay);
                    if (instance instanceof focusOverlay && typeof instance[options] === 'function') {
                        instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                });
            }
        }
    };

    /**
     * Names of the pluguin methods that can act as a getter method.
     * @type {Array}
     */
    $.fn.focusOverlay.getters = ["destroy"];

    /**
     * Default options
     */
    $.fn.focusOverlay.defaults = {
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
        alwaysActive: false, // Force the box to always stay active. Overrides inactiveOnClick
    };
}));