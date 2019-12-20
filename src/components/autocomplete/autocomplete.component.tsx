import * as React from 'react';
import { observer } from 'mobx-react';
import rootStores from '../../stores';

@observer
export default class Autocomplete extends React.Component {
  render() {
    const autocompleteWidthTransition = rootStores.viewStore.showSearchBox ? 'autocomplete-width-transition' : '';
    const autocompleteFadeinTransition = rootStores.viewStore.showSearchBox ? 'autocomplete-fadein-transition' : '';

    return (
      <div className={`autocomplete-container ${autocompleteFadeinTransition}`}>
        <input type='text' className={autocompleteWidthTransition} />
        <div className={`autocomplete-suggestions ${autocompleteWidthTransition}`}>
          <div className='suggestion'>Tel Aviv</div>
        </div>
      </div>
    );
  }
}
