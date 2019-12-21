import { observable, action, IObservableArray, computed } from 'mobx';
import WeatherService from '../services/weather.service';
import Suggestion from '../dto/suggestion.dto';
import DailyForcast from '../dto/dailyforcast.dto';
import CurrentConditions from '../dto/currentConditions.dto';
import config from '../config/app.config';
import StorageUtils from '../utils/storage.utils';

class WeatherStore {
  @observable locationID: number;
  @observable suggestions: IObservableArray<Suggestion> = observable([]);
  @observable fiveDayForcast: IObservableArray<DailyForcast> = observable([]);
  @observable favoritesCurrentCondition: IObservableArray<CurrentConditions> = observable([]);
  @observable searchText: string = '';
  @observable selectedSuggestion: Suggestion;
  @observable currentConditions: CurrentConditions;
  @observable cityName: string = '';
  @observable mainKey: number = config.defaultLocationKey;
  @action
  async init() {
    await this.getAutoComplete('Tel Aviv');
    this.cityName = 'Tel Aviv';
    this.selectedSuggestion = this.suggestions[0];
    this.mainKey = this.selectedSuggestion.Key;

    await this.getCurrentConditions(this.mainKey);
    await this.getFiveDayForcast(this.mainKey);
  }

  @action
  async getAutoComplete(searchString: string) {
    await WeatherService.autocomplete(searchString).then(async (results: any) => {
      this.clearSuggestions();
      this.suggestions = results;
    });
  }

  @action
  getCurrentConditions(locationID: number) {
    WeatherService.currentConditions(locationID).then((result: any) => {
      this.currentConditions = result;
    });
  }

  @action
  getFavoritesCurrentConditions(favoritesObject: any) {
    this.favoritesCurrentCondition.clear();

    Object.entries(favoritesObject).forEach(([key, value]) => {
      WeatherService.currentConditions(parseInt(key)).then((result: any) => {
        result.Key = parseInt(key);
        result.CityName = value as string;
        this.favoritesCurrentCondition.push(result);
      });
    });
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
    this.cityName = suggestion.LocalizedName;
    this.mainKey = suggestion.Key;
    this.getFiveDayForcast(this.mainKey);
  }

  @action
  clearSuggestions() {
    this.suggestions.clear();
  }

  @action
  clearFiveDayForcast() {
    this.fiveDayForcast.clear();
  }

  @action
  getDay(dateString: string) {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(dateString).getDay()];
  }
  @computed
  get favoriteCityText() {
    if (StorageUtils.isHomepageCity()) {
      const favoriteCityData: any = Object.values(StorageUtils.getHomepageCity());
      return `${favoriteCityData[0]} - ${favoriteCityData[1]}`;
    } else {
      const Temperature =
        this.currentConditions &&
        this.currentConditions.Temperature.Imperial.Value + this.currentConditions.Temperature.Imperial.Unit;
      return this.cityName + ' ' + Temperature;
    }
  }
}

export default WeatherStore;
