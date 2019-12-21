import { observable, action, observe } from 'mobx';
import StorageUtils from '../utils/storage.utils';

export default class ViewStore {
  @observable loadingView: boolean = false;
  @observable showSearchBox: boolean = false;
  @observable showFavoritesButton: boolean = true;
  @observable showHomeButton: boolean = false;
  @observable weatherIconNumber: number;
  @observable addOrRemoveFavorites: boolean;
  @observable animateFavoritesButtons: boolean = false;
  @observable favoritesPanelButton: boolean = false;
  @observable anyFavorites: boolean = false;
  @observable selectedFavoritesPanelKey: number | undefined;
  @observable selectedFavoritesTemperature: string;
  @observable selectedFavoritesCityName: string;

  @action
  init = (history: any) => {
    this.setLoadingView(false);
    this.showFavoritesButton = true;
    this.favoritesPanelButton = false;
    this.anyFavorites = StorageUtils.getFavorites() ? true : false;

    if (history.location.pathname.indexOf('/favorites') > -1) {
      this.showHomeButton = true;
      this.showFavoritesButton = false;
    }
  };

  @action
  setLoadingView = (view: boolean) => {
    this.loadingView = view;
  };

  @action
  toggleSearchBox() {
    this.showSearchBox = !this.showSearchBox;
  }

  @action
  toggleActionButton() {
    this.showHomeButton ? (this.showFavoritesButton = true) : (this.showFavoritesButton = false);
    this.showHomeButton = !this.showHomeButton;
  }

  @action
  toggleAddOrRemoveFavorites() {
    this.addOrRemoveFavorites = !this.addOrRemoveFavorites;
  }

  @action
  setWeatherIconNumber(iconNumber: number) {
    this.weatherIconNumber = iconNumber;
  }
}
