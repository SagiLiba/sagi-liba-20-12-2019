import * as React from 'react';
import ForcastDay from '../forcastday/forcastday.component';
import rootStores from '../../stores';
import { observer } from 'mobx-react';
import StorageUtils from '../../utils/storage.utils';

const { weatherStore, viewStore } = rootStores;
@observer
export default class Forcast extends React.Component {
  changeIcon = (iconNumber: number) => {
    viewStore.setWeatherIconNumber(iconNumber);
  };
  renderForcastDays = () => {
    return (
      weatherStore.fiveDayForcast &&
      weatherStore.fiveDayForcast.map((day, index) => {
        return (
          <ForcastDay
            key={index}
            day={weatherStore.getDay(day.Date)}
            temperature={`${day.Temperature.Maximum.Value}C`}
            image={require(`../../assets/weather-icons/${day.Day.Icon}.png`)}
            onClickAction={() => this.changeIcon(day.Day.Icon)}
          />
        );
      })
    );
  };

  render() {
    return (
      <>
        <div className='forcast-container'>
          <div className='forcast-top'>
            <div className='favorite-city'>{weatherStore.favoriteCityText}</div>
          </div>
          <div className='forcast-bottom'>{this.renderForcastDays()}</div>
        </div>
      </>
    );
  }
}
