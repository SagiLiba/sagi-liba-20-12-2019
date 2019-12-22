import config from '../config/app.config';
import API from './api';
import AutoComplete from '../dto/suggestion.dto';
import CurrentConditions from '../dto/currentConditions.dto';
import DailyForcast from '../dto/dailyforcast.dto';
import Suggestion from '../dto/suggestion.dto';

class WeatherService extends API {
  useMockData: boolean = config.useMock;

  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async autocomplete(searchString: string) {
    try {
      let url = `${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${config.apiKey}&q=${searchString}`;

      if (this.useMockData) {
        url = config.mockData.localAutocomplete;
      }

      return this.get(url)
        .then((response) => response.json())
        .then((data) => {
          let response: Suggestion[] = data;
          return response;
        })
        .catch((error) => {
          console.log('ERROR Autocomplete:', error);
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async currentConditions(locationID: number) {
    try {
      let url = `${this.baseUrl}/currentconditions/v1/${locationID}?apikey=${config.apiKey}`;

      if (this.useMockData) {
        url = config.mockData.localCurrentCondition;
      }

      return this.get(url)
        .then((response) => response.json())
        .then((data) => {
          let response: CurrentConditions = data[0];
          return response;
        })
        .catch((error) => {
          console.log('ERROR Current conditions:', error);
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async fiveDayForcast(locationID: number) {
    try {
      let url = `${this.baseUrl}/forecasts/v1/daily/5day/${locationID}?apikey=${config.apiKey}`;

      if (this.useMockData) {
        url = config.mockData.localFiveDayForcast;
      }

      return this.get(url)
        .then((response) => response.json())
        .then((data) => {
          let response: DailyForcast[] = data.DailyForecasts;
          return response;
        })
        .catch((error) => {
          console.log('ERROR Five day forecast:', error);
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }
}

export default new WeatherService(config.baseUrl);
