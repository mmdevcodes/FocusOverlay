import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import Waypoint from 'react-waypoint';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';
import Header from '../components/Header';
import Nav from '../components/Nav';
import CodeBlock from '../components/CodeBlock';
import Examples from '../components/Examples';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyNav: false
    };
  }

  _handleWaypointEnter = () => {
    this.setState(() => ({ stickyNav: false }));
  };

  _handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: false }));
  };

  componentDidMount() {
    import(/* webpackChunkName: "focus-overlay" */ 'focus-overlay')
      .then(({ default: FocusOverlay }) => {
        this.focusoverlay = new FocusOverlay(document.querySelector('body'), {
          alwaysActive: true,
          zIndex: 10001
        });

        document
          .querySelector('#gatsby-focus-wrapper')
          .setAttribute('data-focus-ignore', '');

        this.focusoverlay.moveFocusBox(document.querySelector('body'));

        setTimeout(() => {
          const initialFocusEl = document.querySelector('#initial-focus');

          if (document.body.contains(initialFocusEl)) {
            this.focusoverlay.moveFocusBox(initialFocusEl);
          }
        }, 1500);
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    this.focusoverlay.destroy();
  }

  render() {
    return (
      <Layout>
        <Helmet title="Focus Overlay" />
        <Header />
        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        ></Waypoint>
        <Nav sticky={this.state.stickyNav} fo={this.focusoverlay} />
        <div id="main">
          <section id="intro" className="main">
            <div className="spotlight align-top">
              <div className="content">
                <header className="major">
                  <h2>Getting Started</h2>
                </header>
                <ReactMarkdown
                  source={`
## Install

Install with npm:

\`\`\`bash
npm install focus-overlay
\`\`\`

Install in browser:

\`\`\`html
<!-- In the <head> -->
<link rel="stylesheet" href="//unpkg.com/focus-overlay@latest/dist/focusoverlay.css" />

<!-- End of <body> -->
<script src="//unpkg.com/focus-overlay@latest/dist/focusoverlay.js"></script>
\`\`\`

The CSS is small enough to copy directly into your project's main stylesheet if you desire.
                  `}
                  renderers={{
                    code: CodeBlock
                  }}
                />
              </div>
              <span className="image square">
                <p>
                  Library for creating overlays on focused elements. It was
                  built with accessibility in mind with trigger keys and ARIA
                  roles.
                </p>
                <img
                  src="https://camo.githubusercontent.com/f111fab117fdcf39da7d84820bb24efb34d7b48a/687474703a2f2f692e696d6775722e636f6d2f7a4d4662376d342e676966"
                  alt=""
                />
              </span>
            </div>
            <div className="spotlight align-top">
              <div className="content">
                <ReactMarkdown
                  source={`
## Usage

\`FocusOverlay(element, options)\`

\`\`\`js
import FocusOverlay from 'focusoverlay';

// Option 1: Zero config - Scopes to <body> element and uses default settings
const fo = new FocusOverlay();

// Option 2: Define an element
const fo = new FocusOverlay(document.body, options);
\`\`\`

The \`element\` is what FocusOverlay will be scoped to. It takes either a string CSS selector or an HTML element. If no element is supplied it will scope to the \`<body>\` element by default.

The \`options\` is an optional parameter. Takes an object. See [options](#options) for more info.

By default Focus Overlay will show and animate when hitting keyboard keys such as the \`Tab\` key. It's also preconfigured to animate via CSS transitions.
                `}
                  renderers={{
                    code: CodeBlock
                  }}
                />
              </div>
            </div>
          </section>

          <section id="first" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2 id="options">Options & Methods</h2>
                </header>
                <ReactMarkdown
                  source={`
## Options

The default \`options\` are:

\`\`\`js
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
\`\`\`

## Methods

\`\`\`js
// Example use of the "moveFocusBox" method
focusoverlay.moveFocusBox(document.querySelector('body'));
\`\`\`

### moveFocusBox

**Arguments:** Element

Moves the focusBox to a target element

### Destroy

**Arguments:** None

Deconstructs the FocusOverlay instance
                  `}
                  renderers={{
                    code: CodeBlock
                  }}
                />
              </div>
            </div>
          </section>

          <section id="second" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>Data Attributes</h2>
                </header>
                <ReactMarkdown
                  source={`
In some cases you might want FocusOverlay to ignore certain elements, or focus **other** elements instead. There are a few options available:

### Example usage for \`data-focus\`:

\`\`\`html
<div id="input-wrapper">
  <input type="text" data-focus="#input-wrapper" />
</div>
\`\`\`

In this example when the user focuses the input, FocusOverlay will instead target the wrapper. The \`data-focus\` attribute accepts a querySelector string.

### Example usage for \`data-focus-label\`:

\`\`\`html
<label for="stylized-checkbox" class="rounded-checkbox">Click me</label>
<input
  id="stylized-checkbox"
  type="checkbox"
  class="visually-hidden"
  data-focus-label
/>
\`\`\`

In this example when the user focuses the input, FocusOverlay will instead target its associated label.

### Example usage for \`data-focus-ignore\`:

\`\`\`html
<a href="/info.html" data-focus-ignore>Really important information here!</a>
\`\`\`

In this example FocusOverlay will not target this element at all.
                  `}
                  renderers={{
                    code: CodeBlock
                  }}
                />
              </div>
            </div>
          </section>

          <section id="cta" className="main">
            <header className="major">
              <h2 id="examples">Examples</h2>
            </header>
            <p>
              Below contains various html controls and demonstrates when the
              keyboard is being used to show FocusOverlay.
            </p>
            <Examples />
          </section>
        </div>
      </Layout>
    );
  }
}

export default Index;
