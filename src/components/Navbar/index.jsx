import React, { Component } from 'react';

const NavBar = () => (
  <div className="ui large menu">
    <a className="item">
      Home
    </a>
    <a className="item">
      Messages
    </a>
    <div className="right menu">
      <div className="ui dropdown item">
        Machine Learning Methods<i className="dropdown icon"></i>
        <div className="menu">
          <a className="item">Perceptron</a>
          <a className="item">Gradient Descent</a>
          <a className="item">K Means</a>
        </div>
      </div>
      <div className="item">
          <div className="ui primary button">Sign In</div>
      </div>
    </div>
  </div>
);

export default NavBar;

