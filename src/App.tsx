import * as React from 'react';
import rootStores from './stores/index';
import { observer } from 'mobx-react';
import './main.scss';
import Navbar from './components/navbar/navbar.component';

@observer
export default class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <Navbar />
      </div>
    );
  }
}
