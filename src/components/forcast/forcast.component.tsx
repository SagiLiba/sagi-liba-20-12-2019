import * as React from 'react';
import ForcastDay from '../forcastday/forcastday.component';
import rootStores from '../../stores';
import { observer } from 'mobx-react';

const { weatherStore, viewStore } = rootStores;
@observer
export default class Forcast extends React.Component {
  componentDidMount() {
    weatherStore.getFiveDayForcast(215854);
  }

  getDay = (dateString: string) => {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(dateString).getDay()];
  };
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
            day={this.getDay(day.Date)}
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
            <div className='favorite-city'>Tel Aviv - 22C</div>
          </div>
          <div className='forcast-bottom'>{this.renderForcastDays()}</div>
        </div>
      </>
    );
  }
}
