import React from 'react';

import logo from '../assets/images/logo-white.svg';

const Header = props => (
  <header id="header" className="alt">
    <span className="logo">
      <img src={logo} alt="" />
    </span>
    <h1>
      <span id="initial-focus" tabIndex="0">
        Focus
      </span>{' '}
      Overlay
    </h1>
    <p>
      Library for creating overlays on focused elements. <br />
      Use the tab key to focus around different elements.
    </p>
  </header>
);

export default Header;
