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
      let result: any;
      console.log('Autocomplete');
      // if (this.useMockData) {
      //   result = await this.get('http://localhost:3000/mockdata/autocomplete.json');
      // } else {
      //   await this.get(`${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${config.apiKey}&q=${searchString}`);
      // }
      return (
        fetch(`${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${config.apiKey}&q=${searchString}`)
          // We get the API response and receive data in JSON format...
          .then((response) => response.json())
          .then((data) => {
            let response: Suggestion[] = data;
            console.log('Logging Autocomplete: ', data, response);
            return;
          })
          .catch((error) => {
            console.log('ERROR AC:', error);
          })
      );
    } catch (error) {
      throw error;
    }
  }

  async currentConditions(locationID: number) {
    try {
      let result: any;

      if (this.useMockData) {
        result = await this.get('http://localhost:3000/mockdata/currentconditions.json');
      } else {
        result = await this.get(`${this.baseUrl}/currentconditions/v1/${locationID}`);
      }
      console.log(result);
      let response: any = result[0];
      return response;
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
