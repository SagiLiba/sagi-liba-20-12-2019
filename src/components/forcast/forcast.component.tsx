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
      <div className='forcast-container'>
        {this.forcastDay()}
        {this.forcastDay()}
        {this.forcastDay()}
        {this.forcastDay()}
        {this.forcastDay()}
      </div>
    );
  }
}
