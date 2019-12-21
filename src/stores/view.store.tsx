import { observable, action, observe } from 'mobx';

export default class ViewStore {
  @observable loadingView: boolean = false;
  @observable showSearchBox: boolean = false;
  @observable showFavoritesButton: boolean = true;
  @observable showHomeButton: boolean = false;
  @observable weatherIconNumber: number = 1;

  @action
  init = (history: any) => {
    this.setLoadingView(false);
    this.showFavoritesButton = true;
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
  setWeatherIconNumber(iconNumber: number) {
    this.weatherIconNumber = iconNumber;
  }
}
