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

const { weatherStore, viewStore } = rootStores;
@observer
export default class Navbar extends React.Component<IProps, IState> {
  onClickFavorites = () => {
    viewStore.toggleActionButton();
    this.props.history.push('/favorites');
    this.closeAutocomplete();
  };

  onClickHome = () => {
    viewStore.toggleActionButton();
    this.closeAutocomplete();
    this.props.history.push('/');
  };

  onClickSearch = () => {
    viewStore.toggleSearchBox();
    this.closeAutocomplete();
  };

  closeAutocomplete = () => {
    const autocompleteSuggestions: any = document.getElementsByClassName('autocomplete-suggestions')[0];
    weatherStore.searchText = '';
    weatherStore.clearSuggestions();
    autocompleteSuggestions.style.display = 'none';
  };

  render() {
    const searchIcon = viewStore.showSearchBox
      ? require('../../assets/search-close-small.png')
      : require('../../assets/search-small.png');
    const actionButton = viewStore.showHomeButton ? require('../../assets/home.png') : require('../../assets/star.png');

    const onClickActionButton = viewStore.showHomeButton ? this.onClickHome : this.onClickFavorites;

    return (
      <>
        <div className='navbar-outer-container'>
          <div className='navbar-container'>
            <div className='navbar-buttons'>
              <img
                src={actionButton}
                className={!viewStore.showHomeButton ? 'favorites-button' : ''}
                onClick={onClickActionButton}
              />
            </div>
            <div className='navbar-logo'>
              <img src={require('../../assets/logo.png')} alt='World Weather' />
            </div>
            <div className='navbar-search'>
              <img src={searchIcon} alt='Search' onClick={this.onClickSearch} />
            </div>
          </div>
          <Autocomplete history={this.props.history} />
          {viewStore.showFavoritesButton && <AddRemoveButton />}
        </div>
      </>
    );
  }
}
