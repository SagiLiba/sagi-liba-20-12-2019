import * as React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className='navbar-container'>
        <div className='navbar-buttons'>
          <img src={require('../../assets/star.png')} alt='Favorites' />
        </div>
        <div className='navbar-logo'>
          <img src={require('../../assets/logo.png')} alt='World Weather' />
        </div>
        <div className='navbar-search'>
          <img src={require('../../assets/search-small.png')} alt='Search' />
        </div>
      </div>
    );
  }
}
