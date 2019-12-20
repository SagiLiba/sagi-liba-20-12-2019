import axios from 'axios';

export default class API {
  baseUrl: string;

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error(`Erorr in creating Http service with baseUrl: ${baseUrl}`);
    }
    this.baseUrl = baseUrl;
  }

  protected get(url: string) {
    return axios.get(url);
  }
}
