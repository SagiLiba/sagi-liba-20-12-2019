import config from '../config/app.config';
import API from './api';

class WeatherService extends API {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async autocomplete(searchString: string) {
    try {
      return await this.get(
        `${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${config.apiKey}&q=${searchString}`
      );
    } catch (error) {
      throw error;
    }
  }

  async currentConditions(locationID: number) {
    try {
      return await this.get(`${this.baseUrl}/currentconditions/v1/${locationID}`);
    } catch (error) {
      throw error;
    }
  }

  async fiveDayForcast(locationID: number) {
    try {
      return await this.get(`${this.baseUrl}/forecasts/v1/daily/5day/${locationID}`);
    } catch (error) {
      throw error;
    }
  }
}

export default new WeatherService(config.baseUrl);
