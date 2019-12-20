import * as React from 'react';
import ForcastDay from '../forcastday/forcastday.component';

export default class Forcast extends React.Component {
  render() {
    return (
      <>
        <div className='forcast-container'>
          <div className='forcast-top'>
            <div className='favorite-city'>Tel Aviv - 22C</div>
          </div>
          <div className='forcast-bottom'>
            <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
            <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
            <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
            <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
            <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
          </div>
        </div>
      </>
    );
  }
}
