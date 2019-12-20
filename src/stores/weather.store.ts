import { observable, action } from 'mobx';
import WeatherService from '../services/weather.service';

class WeatherStore {
  @observable locationID: number;

  @action
  getAutoComplete(searchString: string) {
    return WeatherService.autocomplete(searchString);
  }

  @action
  getCurrentConditions(locationID: number) {
    return WeatherService.currentConditions(locationID);
  }

  @action
  getFiveDayForcast(locationID: number) {
    return WeatherService.fiveDayForcast(locationID);
  }
}

export default WeatherStore;
