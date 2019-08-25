import React from 'react';
import FocusOverlay from 'focus-overlay';
import '../assets/scss/main.scss';

import Footer from './Footer';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'is-loading'
    };
    this.focusoverlay = new FocusOverlay('body', {
      alwaysActive: true,
      zIndex: 10001
    });
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '' });
      this.focusoverlay.moveFocusBox(document.querySelector('body'));

      setTimeout(() => {
        const initialFocusEl = document.querySelector('#initial-focus');

        if (document.body.contains(initialFocusEl)) {
          document.querySelector('#initial-focus').focus();
        }
      }, 1500);
    }, 100);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div className={`body ${this.state.loading}`}>
        <div id="wrapper">
          {children}
          <Footer />
        </div>
      </div>
    );
  }
}

export default Template;
