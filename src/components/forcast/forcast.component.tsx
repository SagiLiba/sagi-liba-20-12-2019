import * as React from 'react';
import ForcastDay from '../forcastday/forcastday.component';
import rootStores from '../../stores';
import DailyForcast from '../../dto/dailyforcast.dto';

export default class Forcast extends React.Component {
  componentDidMount() {
    rootStores.weatherStore
      .getFiveDayForcast(215854)
      .then((res: DailyForcast[]) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <div className='forcast-container'>
          <div className='forcast-top'>
            <div className='favorite-city'>Tel Aviv - 22C</div>
          </div>
          <div className='forcast-bottom'>
            <ForcastDay
              day='Sunday'
              temperature='17C'
              image={require('../../assets/weather-icons/1.png')}
              onClickAction={() => {}}
            />
            <ForcastDay
              day='Sunday'
              temperature='17C'
              image={require('../../assets/weather-icons/2.png')}
              onClickAction={() => {}}
            />
            <ForcastDay
              day='Sunday'
              temperature='17C'
              image={require('../../assets/weather-icons/3.png')}
              onClickAction={() => {}}
            />
            <ForcastDay
              day='Sunday'
              temperature='17C'
              image={require('../../assets/weather-icons/4.png')}
              onClickAction={() => {}}
            />
            <ForcastDay
              day='Sunday'
              temperature='17C'
              image={require('../../assets/weather-icons/5.png')}
              onClickAction={() => {}}
            />
          </div>
        </div>
      </>
    );
  }
}
