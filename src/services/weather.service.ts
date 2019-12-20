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
      let result;

      if (this.useMockData) {
        result = await this.get('http://localhost:3000/mockdata/autocomplete.json');
      } else {
        await this.get(`${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${config.apiKey}&q=${searchString}`);
      }

      if (result && result.status) {
        let response: Suggestion[] = result.data;
        return response;
      } else {
        throw new Error('Fetching autocomplete data failed');
      }
    } catch (error) {
      throw error;
    }
  }

  async currentConditions(locationID: number) {
    try {
      let result;

      if (this.useMockData) {
        result = await this.get('http://localhost:3000/mockdata/currentconditions.json');
      } else {
        result = await this.get(`${this.baseUrl}/currentconditions/v1/${locationID}`);
      }

      if (result && result.status) {
        console.log(result);
        let response: CurrentConditions = result.data[0];
        return response;
      } else {
        throw new Error('Fetching Current Conditions data failed');
      }
    } catch (error) {
      throw error;
    }
  }

  async fiveDayForcast(locationID: number) {
    try {
      let result;

      if (this.useMockData) {
        result = await this.get('http://localhost:3000/mockdata/fivedayforcast.json');
      } else {
        result = await this.get(`${this.baseUrl}/forecasts/v1/daily/5day/${locationID}`);
      }

      if (result && result.status) {
        console.log(result);
        let response: DailyForcast[] = result.data.DailyForecasts;
        return response;
      } else {
        throw new Error('Fetching five day forcast data failed');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new WeatherService(config.baseUrl);
