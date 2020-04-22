import React, { Component } from 'react';
// import Login from './containers/Login';
import ProductsContainer from './containers/ProductsContainer.js';


export default class App extends Component {
  render() {
    return (
      <div>
        <ProductsContainer />
      </div>
    );
  }
}
