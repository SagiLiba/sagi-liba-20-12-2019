import * as React from 'react';
import { observer } from 'mobx-react';
import rootStores from '../../stores';
import Suggestion from '../../dto/suggestion.dto';
import StorageUtils from '../../utils/storage.utils';

interface IProps {
  history: any;
}

const { weatherStore, viewStore } = rootStores;
@observer
export default class Autocomplete extends React.Component<IProps> {
  handleChange = (e: any) => {
    const searchText = e.target.value;
    if (searchText && searchText.length > 0) {
      this.showHideSuggestions(true);
    } else {
      this.showHideSuggestions(false);
    }

    weatherStore.setSearchText(searchText);
    weatherStore.getAutoComplete(searchText);
  };

  onClickSuggestion = (suggestion: Suggestion) => {
    weatherStore.setSearchText(suggestion.LocalizedName);
    weatherStore.setSelectedSuggestion(suggestion);
    StorageUtils.isInFavorites(suggestion.Key)
      ? (viewStore.addOrRemoveFavorites = true)
      : (viewStore.addOrRemoveFavorites = false);
    this.showHideSuggestions(false);

    if (this.props.history.location.pathname.indexOf('/favorites') > -1) {
      viewStore.showHomeButton = false;
      viewStore.showFavoritesButton = true;
      this.props.history.push('/');
    }
  };

  showHideSuggestions = (show: boolean) => {
    const autocompleteSuggestions: any = document.getElementsByClassName('autocomplete-suggestions')[0];
    if (show) {
      autocompleteSuggestions.style.display = 'block';
    } else {
      autocompleteSuggestions.style.display = 'none';
    }
  };

  renderSuggestions() {
    const suggestions = weatherStore.suggestions;
    return (
      suggestions &&
      suggestions.map((s: Suggestion) => {
        return (
          <div className='suggestion' key={s.Key} onClick={() => this.onClickSuggestion(s)}>
            {s.LocalizedName}
          </div>
        );
      })
    );
  }

  render() {
    const autocompleteWidthTransition = viewStore.showSearchBox ? 'autocomplete-width-transition' : '';
    const autocompleteFadeinTransition = viewStore.showSearchBox ? 'autocomplete-fadein-transition' : '';

    return (
      <div className={`autocomplete-container ${autocompleteFadeinTransition}`}>
        <input
          type='text'
          value={weatherStore.searchText}
          placeholder={'Enter city name'}
          className={autocompleteWidthTransition}
          onChange={this.handleChange}
        />
        <div className={`autocomplete-suggestions ${autocompleteWidthTransition}`}>{this.renderSuggestions()}</div>
      </div>
    );
  }
}
