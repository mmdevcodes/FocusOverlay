import React from 'react';
import GithubCorner from 'react-github-corner';
import '../assets/scss/main.scss';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'is-loading'
    };
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '' });
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
          <GithubCorner
            href="https://github.com/mmahandev/focusoverlay"
            svgStyle={{ position: 'fixed' }}
          />
        </div>
      </div>
    );
  }
}

export default Template;
