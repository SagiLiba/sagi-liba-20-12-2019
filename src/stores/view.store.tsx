import { observable, action, observe } from 'mobx';

export default class ViewStore {
  @observable loadingView: boolean = false;
  @observable showSearchBox: boolean = false;

  @action
  init = () => {
    this.setLoadingView(false);
  };

  @action
  setLoadingView = (view: boolean) => {
    this.loadingView = view;
  };

  @action
  toggleSearchBox() {
    this.showSearchBox = !this.showSearchBox;
  }
}
