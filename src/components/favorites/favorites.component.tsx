import * as React from 'react';
import ForcastDay from '../forcastday/forcastday.component';
import { observer } from 'mobx-react';
import rootStores from '../../stores';
import StorageUtils from '../../utils/storage.utils';

const { weatherStore, viewStore } = rootStores;
@observer
export default class Favorites extends React.Component {
  componentDidMount() {
    weatherStore.getFavoritesCurrentConditions(StorageUtils.getFavorites());
  }

  animateButtons = (forcastDay: any) => {
    viewStore.favoritesPanelButton = true;
    viewStore.selectedFavoritesPanelKey = forcastDay.Key;
    viewStore.selectedFavoritesTemperature =
      forcastDay.Temperature.Imperial.Value + forcastDay.Temperature.Imperial.Unit;
    viewStore.animateFavoritesButtons = true;
    setTimeout(() => (viewStore.animateFavoritesButtons = false), 100);
  };

  renderFavorites() {
    return (
      weatherStore.favoritesCurrentCondition &&
      weatherStore.favoritesCurrentCondition.map((current, index) => {
        return (
          <ForcastDay
            key={index}
            uniqueID={current.Key && current.Key}
            day={weatherStore.getDay(current.LocalObservationDateTime)}
            temperature={current.Temperature.Imperial.Value + current.Temperature.Imperial.Unit}
            image={require(`../../assets/weather-icons/${current.WeatherIcon}.png`)}
            onClickAction={() => this.animateButtons(current)}
            cityName={current.CityName}
          />
        );
      })
    );
  }

  removeFavorite = () => {
    if (viewStore.selectedFavoritesPanelKey) {
      viewStore.favoritesPanelButton = false;
      StorageUtils.removeFromFavorites(viewStore.selectedFavoritesPanelKey);
      document.getElementsByClassName(viewStore.selectedFavoritesPanelKey.toString())[0].remove();
    }
  };

  setHomepage = () => {
    if (viewStore.selectedFavoritesPanelKey) {
      StorageUtils.homepageCity(viewStore.selectedFavoritesPanelKey, viewStore.selectedFavoritesTemperature);
    }
  };

  render() {
    return (
      <div className='favorites-container'>
        <div className={`top ${viewStore.animateFavoritesButtons ? 'favorite-buttons-transition' : ''}`}>
          {viewStore.anyFavorites && viewStore.favoritesPanelButton && (
            <>
              <div className={`display-button`} onClick={this.setHomepage}>
                Display at Homepage
              </div>
              <div className={`remove-button`} onClick={this.removeFavorite}>
                Remove Favorite
              </div>
            </>
          )}
        </div>
        <div className='bottom'>{this.renderFavorites()}</div>
      </div>
    );
  }
}
