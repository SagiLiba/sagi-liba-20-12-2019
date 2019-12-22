import { observable, action, IObservableArray, computed } from 'mobx';
import WeatherService from '../services/weather.service';
import Suggestion from '../dto/suggestion.dto';
import DailyForcast from '../dto/dailyforcast.dto';
import CurrentConditions from '../dto/currentConditions.dto';
import config from '../config/app.config';
import StorageUtils from '../utils/storage.utils';
import ViewStore from './view.store';

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
  viewStore: ViewStore;
  constructor(viewStore: ViewStore) {
    this.viewStore = viewStore;
  }

  @action
  init() {
    let favoriteCityName: any;
    // If there is a favorite city fetch its data
    if (StorageUtils.isHomepageCityExists()) {
      favoriteCityName = Object.values(StorageUtils.getHomepageCity());
      this.cityName = favoriteCityName[0];
      this.getData(this.cityName);
    } else {
      this.getData('Tel Aviv');
    }
  }

  @action
  async getData(name: string) {
    try {
      await this.getAutoComplete(name);
      this.cityName = name;
      this.selectedSuggestion = this.suggestions && this.suggestions.filter((s) => s.LocalizedName == name)[0];
      if (!this.selectedSuggestion) {
        this.selectedSuggestion = this.suggestions && this.suggestions[0];
      }
      this.mainKey = this.selectedSuggestion.Key;

      await this.getCurrentConditions(this.mainKey);
      await this.getFiveDayForcast(this.mainKey);
    } catch (error) {
      console.log(error);
    }
  }

  @action
  async getAutoComplete(searchString: string) {
    await WeatherService.autocomplete(searchString)
      .then((results: any) => {
        this.clearSuggestions();
        this.suggestions = results;
      })
      .catch((error) => {
        throw error;
      });
  }

  @action
  getCurrentConditions(locationID: number) {
    this.viewStore.setLoadingView(true);
    WeatherService.currentConditions(locationID)
      .then((result: any) => {
        this.currentConditions = result;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        this.viewStore.setLoadingView(false);
      });
  }

  @action
  getFavoritesCurrentConditions(favoritesObject: any) {
    this.favoritesCurrentCondition.clear();
    Object.entries(favoritesObject).forEach(([key, value]) => {
      WeatherService.currentConditions(parseInt(key))
        .then((result: any) => {
          result.Key = parseInt(key);
          result.CityName = value as string;
          this.favoritesCurrentCondition.push(result);
        })
        .catch((error) => {
          throw error;
        });
    });
  }

  @action
  getFiveDayForcast(locationID: number, setIcon?: boolean) {
    this.viewStore.setLoadingView(true);
    WeatherService.fiveDayForcast(locationID)
      .then((results: any) => {
        this.clearFiveDayForcast();
        this.fiveDayForcast = results;
        this.viewStore.weatherIconNumber = this.fiveDayForcast[0].Day.Icon;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        this.viewStore.setLoadingView(false);
      });
  }

  @action
  setSearchText(text: string) {
    this.searchText = text;
  }

  @action
  setSelectedSuggestion(suggestion: Suggestion, setIcon?: boolean) {
    this.selectedSuggestion = suggestion;
    this.cityName = suggestion.LocalizedName;
    this.mainKey = suggestion.Key;
    this.getFiveDayForcast(this.mainKey, setIcon);
  }

  @action
  clearSuggestions() {
    this.suggestions && this.suggestions.length > 0 && this.suggestions.clear();
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
  get favoritesCurrentConditionLength() {
    return this.favoritesCurrentCondition ? this.favoritesCurrentCondition.length : 0;
  }
  @computed
  get favoriteCityText() {
    if (StorageUtils.isHomepageCityExists()) {
      const favoriteCityData: any = Object.values(StorageUtils.getHomepageCity());
      return `${favoriteCityData[0]} - ${favoriteCityData[1]}`;
    } else {
      let Temperature =
        this.currentConditions &&
        this.currentConditions.Temperature.Imperial.Value + this.currentConditions.Temperature.Imperial.Unit;
      Temperature = Temperature ? Temperature : '';
      return this.cityName + ' ' + Temperature;
    }
  }
}

export default WeatherStore;
