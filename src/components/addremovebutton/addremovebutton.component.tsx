import * as React from 'react';
import { observer } from 'mobx-react';
import rootStores from '../../stores';
import debounce from 'lodash/debounce';
import StorageUtils from '../../utils/storage.utils';

interface IProps {}
interface IState {
  mobileDesktopImage: string;
}

const { weatherStore, viewStore } = rootStores;
@observer
export default class AddRemoveButton extends React.Component<IProps, IState> {
  addMobileImage: any = require('../../assets/add-favorites-mobile.png');
  addDesktopImage: any = require('../../assets/add-favorites-desktop.png');
  removeMobileImage: any = require('../../assets/remove-favorites-mobile.png');
  removeDesktopImage: any = require('../../assets/remove-favorites-desktop.png');
  mobileMaxWidth: number = 1000;

  constructor(props: any) {
    super(props);
    const imageObject = this.getImageObject();
    viewStore.addOrRemoveFavorites = imageObject.isInFavorites;

    this.state = {
      mobileDesktopImage: imageObject.mobileDesktopImage
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.renderButton);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.renderButton);
  }

  renderButton = () => {
    const screenWidth = window.innerWidth;

    let desktopImg = this.getImageObject().desktopImg;
    let mobileImg = this.getImageObject().mobileImg;

    screenWidth > this.mobileMaxWidth
      ? this.setState({ mobileDesktopImage: desktopImg })
      : this.setState({ mobileDesktopImage: mobileImg });
  };

  addToFavorites = () => {
    StorageUtils.addToFavorites(weatherStore.mainKey, weatherStore.selectedSuggestion.LocalizedName);
    viewStore.toggleAddOrRemoveFavorites();
    viewStore.anyFavorites = true;
    this.setState({
      mobileDesktopImage: this.getImageObject().mobileDesktopImage
    });
  };

  removeFromFavorites = () => {
    StorageUtils.removeFromFavorites(weatherStore.mainKey);
    viewStore.toggleAddOrRemoveFavorites();

    if (StorageUtils.getFavorites().length == 0) {
      viewStore.anyFavorites = false;
    }
    this.setState({
      mobileDesktopImage: this.getImageObject().mobileDesktopImage
    });
  };

  getImageObject = () => {
    const isInFavorites: boolean = StorageUtils.isInFavorites(weatherStore.mainKey);
    const desktopImg = isInFavorites ? this.removeDesktopImage : this.addDesktopImage;
    const mobileImg = isInFavorites ? this.removeMobileImage : this.addMobileImage;
    const screenWidth = window.innerWidth;
    const mobileDesktopImage = screenWidth > this.mobileMaxWidth ? desktopImg : mobileImg;
    return {
      isInFavorites,
      desktopImg,
      mobileImg,
      mobileDesktopImage
    };
  };

  render() {
    return (
      <div className={'add-remove-button'}>
        {viewStore.addOrRemoveFavorites ? (
          <img src={this.state.mobileDesktopImage} onClick={this.removeFromFavorites} />
        ) : (
          <img src={this.state.mobileDesktopImage} onClick={this.addToFavorites} />
        )}
      </div>
    );
  }
}
