import { parse } from 'path';

export default class StorageUtils {
  public static addToFavorites(locationID: number, cityName: string) {
    if (!localStorage.getItem('favorites')) {
      const favoritesObject: any = { [locationID]: cityName };
      localStorage.setItem('favorites', JSON.stringify(favoritesObject));
    } else {
      const favoritesObject: any = localStorage.getItem('favorites');
      let parsedArray = favoritesObject && JSON.parse(favoritesObject);
      let obj: any = { ...parsedArray, [locationID]: cityName };

      localStorage.setItem('favorites', JSON.stringify(obj));
    }
  }

  public static removeFromFavorites(locationID: number | undefined) {
    if (!locationID) {
      return;
    }
    if (localStorage.getItem('favorites')) {
      const favoritesObject: any = localStorage.getItem('favorites');
      let parsedObject = favoritesObject && JSON.parse(favoritesObject);

      const filtered = Object.keys(parsedObject)
        .filter((key) => key != locationID.toString())
        .reduce((obj: any, key) => {
          obj[key] = parsedObject[key];
          return obj;
        }, {});
      localStorage.setItem('favorites', JSON.stringify(filtered));
    }
  }

  public static isInFavorites(locationID: number) {
    if (localStorage.getItem('favorites')) {
      const favoritesObject: any = localStorage.getItem('favorites');
      let parsedArray = favoritesObject && JSON.parse(favoritesObject);

      return parsedArray[locationID.toString()] ? true : false;
    } else {
      return false;
    }
  }

  public static getFavorites() {
    if (localStorage.getItem('favorites')) {
      const favoritesArray: any = localStorage.getItem('favorites');
      let parsedArray = favoritesArray && JSON.parse(favoritesArray);
      return parsedArray;
    } else {
      return [];
    }
  }

  public static homepageCity(locationID: number, temperature: string) {
    const favoritesObject = StorageUtils.getFavorites();

    let filtered = Object.keys(favoritesObject)
      .filter((key) => key == locationID.toString())
      .reduce((obj: any, key) => {
        obj[key] = favoritesObject[key];

        return obj;
      }, {});

    filtered['Temperature'] = temperature;
    localStorage.setItem('homepageCity', JSON.stringify(filtered));
  }

  public static getHomepageCity() {
    const data = localStorage.getItem('homepageCity');
    return data && JSON.parse(data);
  }

  public static isHomepageCityExists() {
    const data = localStorage.getItem('homepageCity');
    return data ? true : false;
  }

  public static isThisCurrentHomepageCity(key: number) {
    const data = this.getHomepageCity();
    return data && data.hasOwnProperty(key.toString()) ? true : false;
  }

  public static removeHomepageCity() {
    localStorage.removeItem('homepageCity');
  }
}
