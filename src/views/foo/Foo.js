import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import smallpic from './smallpic.png';

// eslint-disable-next-line react/prefer-stateless-function
export default class Foo extends React.Component {
  render() {
    return (
      <div className="foo">
        <h1>Page Foo</h1>
        <Link to="/bar" className="foo__gobar">
          goto /bar
        </Link>

        <p>
          <img src={smallpic} alt="" />
        </p>
      </div>
    );
  }
}
