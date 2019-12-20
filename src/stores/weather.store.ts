import { observable, action, IObservableArray } from 'mobx';
import WeatherService from '../services/weather.service';
import Suggestion from '../dto/suggestion.dto';

class WeatherStore {
  @observable locationID: number;
  @observable suggestions: IObservableArray<Suggestion> = observable([]);
  @observable searchText: string = '';

  @action
  getAutoComplete(searchString: string) {
    WeatherService.autocomplete(searchString).then((results: any) => {
      this.clearSuggestions();
      this.suggestions = results;
    });
  }

  @action
  getCurrentConditions(locationID: number) {
    return WeatherService.currentConditions(locationID);
  }

  @action
  getFiveDayForcast(locationID: number) {
    return WeatherService.fiveDayForcast(locationID);
  }

  @action
  setSearchText(text: string) {
    this.searchText = text;
    console.log(this.searchText);
  }

  @action
  clearSuggestions() {
    this.suggestions.clear();
  }
}

export default WeatherStore;
