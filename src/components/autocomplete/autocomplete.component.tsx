import * as React from 'react';
import { observer } from 'mobx-react';
import rootStores from '../../stores';
import Suggestion from '../../dto/suggestion.dto';
interface IProps {}
interface IState {}
@observer
export default class Autocomplete extends React.Component {
  handleChange(e: any) {
    const searchText = e.target.value;
    const autocompleteSuggestions: any = document.getElementsByClassName('autocomplete-suggestions')[0];
    if (searchText && searchText.length > 0) {
      autocompleteSuggestions.style.display = 'block';
    } else {
      autocompleteSuggestions.style.display = 'none';
    }

    rootStores.weatherStore.setSearchText(searchText);
    rootStores.weatherStore.getAutoComplete(searchText);
  }

  renderSuggestions() {
    const suggestions = rootStores.weatherStore.suggestions;
    return (
      suggestions &&
      suggestions.map((s: Suggestion) => {
        return (
          <div className='suggestion' key={s.Key}>
            {s.LocalizedName}
          </div>
        );
      })
    );
  }

  render() {
    const autocompleteWidthTransition = rootStores.viewStore.showSearchBox ? 'autocomplete-width-transition' : '';
    const autocompleteFadeinTransition = rootStores.viewStore.showSearchBox ? 'autocomplete-fadein-transition' : '';

    return (
      <div className={`autocomplete-container ${autocompleteFadeinTransition}`}>
        <input
          type='text'
          value={rootStores.weatherStore.searchText}
          className={autocompleteWidthTransition}
          onChange={this.handleChange}
        />
        <div className={`autocomplete-suggestions ${autocompleteWidthTransition}`}>{this.renderSuggestions()}</div>
      </div>
    );
  }
}
