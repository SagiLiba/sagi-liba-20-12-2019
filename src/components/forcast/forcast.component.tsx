import * as React from 'react';

export default class Forcast extends React.Component {
  forcastDay = () => {
    return (
      <div className='forcast-day-container'>
        <div className='forcast-day-content'>
          <p>Sunday</p>
          <p>17C</p>
        </div>
        <div className='forcast-day-icon'>
          <img src={require('../../assets/sun.png')} alt='Sunny' />
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <div className='forcast-container'>
          <div className='forcast-top'>
            <div className='favorite-city'>Tel Aviv - 22C</div>
          </div>
          <div className='forcast-bottom'>
            {this.forcastDay()}
            {this.forcastDay()}
            {this.forcastDay()}
            {this.forcastDay()}
            {this.forcastDay()}
          </div>
        </div>
      </>
    );
  }
}
