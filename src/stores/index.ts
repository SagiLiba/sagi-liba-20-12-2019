import ViewStore from './view.store';
import WeatherStore from './weather.store';

const viewStore = new ViewStore();
const weatherStore = new WeatherStore(viewStore);

const rootStores = {
  viewStore,
  weatherStore
};

export default rootStores;
