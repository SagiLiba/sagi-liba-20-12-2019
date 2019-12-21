import { observable, action, IObservableArray } from 'mobx';
import WeatherService from '../services/weather.service';
import Suggestion from '../dto/suggestion.dto';
import DailyForcast from '../dto/dailyforcast.dto';

class WeatherStore {
  @observable locationID: number;
  @observable suggestions: IObservableArray<Suggestion> = observable([]);
  @observable fiveDayForcast: IObservableArray<DailyForcast> = observable([]);
  @observable searchText: string = '';
  @observable selectedSuggestion: Suggestion;

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
    WeatherService.fiveDayForcast(locationID).then((results: any) => {
      this.clearFiveDayForcast();
      this.fiveDayForcast = results;
    });
  }

  @action
  setSearchText(text: string) {
    this.searchText = text;
  }

  @action
  setSelectedSuggestion(suggestion: Suggestion) {
    this.selectedSuggestion = suggestion;
    this.getFiveDayForcast(suggestion.Key);
  }

  @action
  clearSuggestions() {
    this.suggestions.clear();
  }

  @action
  clearFiveDayForcast() {
    this.fiveDayForcast.clear();
  }
}

export default WeatherStore;
