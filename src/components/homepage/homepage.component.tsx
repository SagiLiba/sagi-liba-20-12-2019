import * as React from 'react';
import Forcast from '../forcast/forcast.component';
import rootStores from '../../stores';
import { observer } from 'mobx-react';
import WeatherImage from '../weatherImage/weather.image.component';

interface IProps {
  history?: any;
}

interface IState {}
const { weatherStore, viewStore } = rootStores;
@observer
export default class Homepage extends React.Component<IProps, IState> {
  render() {
    return (
      <>
        <WeatherImage iconNumber={viewStore.weatherIconNumber} cityName={weatherStore.cityName} />
        <Forcast />
      </>
    );
  }
}
