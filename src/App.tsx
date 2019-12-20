import * as React from 'react';
import rootStores from './stores/index';
import { observer } from 'mobx-react';
import { createBrowserHistory, History } from 'history';
import './main.scss';
import Navbar from './components/navbar/navbar.component';
import { Router, Route } from 'react-router-dom';
import Homepage from './components/homepage/homepage.component';

const history: History | any = createBrowserHistory();

@observer
export default class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <Navbar history={history} />
        <Router history={history}>
          <Route exact path='/' component={Homepage} />
        </Router>
      </div>
    );
  }
}
