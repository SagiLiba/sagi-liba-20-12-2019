import * as React from 'react';
import rootStores from '../../stores';
import { observer } from 'mobx-react';

const { viewStore } = rootStores;
@observer
export default class AppLoader extends React.Component {
  render() {
    return (
      <>
        {viewStore.loadingView && (
          <div className='loader'>
            <img src={require('../../assets/loader2.gif')} />
          </div>
        )}
      </>
    );
  }
}
