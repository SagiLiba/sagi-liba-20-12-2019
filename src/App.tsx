import * as React from 'react';
import rootStores from './stores/index';
import { observer } from 'mobx-react';
import './App.scss';
import { observe } from 'mobx';

@observer
export default class App extends React.Component {
  render() {
    return (
      <>
        <div>Hello</div>
      </>
    );
  }
}
