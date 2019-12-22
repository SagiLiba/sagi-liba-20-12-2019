export default class API {
  baseUrl: string;

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error(`Error no base url found`);
    }
    this.baseUrl = baseUrl;
  }

  protected get(url: string) {
    return fetch(url);
  }
}
