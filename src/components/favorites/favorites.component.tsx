import * as React from 'react';
import ForcastDay from '../forcastday/forcastday.component';

export default class Favorites extends React.Component {
  render() {
    return (
      <div className='favorites-container'>
        <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
        <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
        <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
        <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
        <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} />
      </div>
    );
  }
}
