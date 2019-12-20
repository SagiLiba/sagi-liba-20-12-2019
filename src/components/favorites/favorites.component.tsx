import * as React from 'react';
import ForcastDay from '../forcastday/forcastday.component';

export default class Favorites extends React.Component {
  render() {
    return (
      <div className='favorites-container'>
        <div className='top'>
          <div className='display-button'>Display at Homepage</div>
          <div className='remove-button'>Remove Favorite</div>
        </div>
        <div className='bottom'>
          <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} onClickAction={() => {}} />
          <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} onClickAction={() => {}} />
          <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} onClickAction={() => {}} />
          <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} onClickAction={() => {}} />
          <ForcastDay day='Sunday' temperature='17C' image={require('../../assets/sun.png')} onClickAction={() => {}} />
        </div>
      </div>
    );
  }
}
