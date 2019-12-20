import config from '../config/app.config';
import API from './api';

class WeatherService extends API {
  constructor(baseUrl: string) {
    super(baseUrl);
  }
}

export default new WeatherService(config.baseUrl);
