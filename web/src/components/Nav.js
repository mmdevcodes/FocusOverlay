import React from 'react';
import Scrollspy from 'react-scrollspy';
import Scroll from './Scroll';

const Nav = props => (
  <nav id="nav" className={props.sticky ? 'alt' : ''}>
    <Scrollspy
      items={['intro', 'first', 'second', 'cta']}
      currentClassName="is-active"
      offset={-300}
    >
      <li>
        <Scroll type="id" element="intro" fo={props.fo}>
          <a href="#">Getting Started</a>
        </Scroll>
      </li>
      <li>
        <Scroll type="id" element="first" fo={props.fo}>
          <a href="#">Options & Methods</a>
        </Scroll>
      </li>
      <li>
        <Scroll type="id" element="second" fo={props.fo}>
          <a href="#">Data Attributes</a>
        </Scroll>
      </li>
      <li>
        <Scroll type="id" element="cta" fo={props.fo}>
          <a href="#">Examples</a>
        </Scroll>
      </li>
    </Scrollspy>
  </nav>
);

export default Nav;
