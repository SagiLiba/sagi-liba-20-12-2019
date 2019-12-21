import * as React from 'react';
import rootStores from './stores/index';
import { observer } from 'mobx-react';
import { createBrowserHistory, History } from 'history';
import './main.scss';
import { Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/navbar.component';
import Homepage from './components/homepage/homepage.component';
import Favorites from './components/favorites/favorites.component';
import StorageUtils from './utils/storage.utils';

const history: History | any = createBrowserHistory();
const { weatherStore, viewStore } = rootStores;
@observer
export default class App extends React.Component {
  componentDidMount() {
    weatherStore.init();
    viewStore.init(history);
    weatherStore.currentConditions && viewStore.setWeatherIconNumber(weatherStore.currentConditions.WeatherIcon);
  }

  render() {
    return (
      <div className='app-container'>
        <Navbar history={history} />
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/favorites' component={Favorites} />
          </Switch>
        </Router>
      </div>
    );
  }
}
