import * as React from 'react';
import Autocomplete from '../autocomplete/autocomplete.component';
import rootStores from '../../stores';
import { observer } from 'mobx-react';
import AddRemoveButton from '../addremovebutton/addremovebutton.component';
import { action } from 'mobx';

interface IProps {
  history?: any;
}

interface IState {}

@observer
export default class Navbar extends React.Component<IProps, IState> {
  onClickFavorites = () => {
    rootStores.viewStore.toggleActionButton();
    this.props.history.push('/favorites');
  };

  onClickHome = () => {
    rootStores.viewStore.toggleActionButton();
    this.props.history.push('/');
  };

  render() {
    const searchIcon = rootStores.viewStore.showSearchBox
      ? require('../../assets/search-close-small.png')
      : require('../../assets/search-small.png');
    const actionButton = rootStores.viewStore.showHomeButton
      ? require('../../assets/home.png')
      : require('../../assets/star.png');

    const onClickActionButton = rootStores.viewStore.showHomeButton ? this.onClickHome : this.onClickFavorites;

    return (
      <>
        <div className='navbar-outer-container'>
          <div className='navbar-container'>
            <div className='navbar-buttons'>
              <img
                src={actionButton}
                className={!rootStores.viewStore.showHomeButton ? 'favorites-button' : ''}
                onClick={onClickActionButton}
              />
            </div>
            <div className='navbar-logo'>
              <img src={require('../../assets/logo.png')} alt='World Weather' />
            </div>
            <div className='navbar-search'>
              <img src={searchIcon} alt='Search' onClick={() => rootStores.viewStore.toggleSearchBox()} />
            </div>
          </div>
          <Autocomplete />
          {rootStores.viewStore.showFavoritesButton && <AddRemoveButton />}
        </div>
      </>
    );
  }
}
