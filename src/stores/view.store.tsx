import { observable, action } from 'mobx';

export default class ViewStore {
  @observable loadingView: boolean = false;

  @action
  init = () => {
    this.setLoadingView(false);
  };

  @action
  setLoadingView = (view: boolean) => {
    this.loadingView = view;
  };
}
