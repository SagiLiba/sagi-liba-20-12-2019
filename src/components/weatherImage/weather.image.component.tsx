import * as React from 'react';

interface IProps {
  iconNumber: number;
  cityName: string;
}
export default class WeatherImage extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  handleIcon() {
    const { iconNumber } = this.props;
    let image: any;
    if (iconNumber < 6) {
      image = require('../../assets/1-5.png');
    } else if (iconNumber >= 6 && iconNumber <= 11) {
      image = require('../../assets/6-11.png');
    } else if (iconNumber >= 12 && iconNumber <= 18) {
      image = require('../../assets/12-18.png');
    } else if (iconNumber >= 19 && iconNumber <= 32) {
      image = require('../../assets/19-32.png');
    } else if (iconNumber >= 33 && iconNumber <= 36) {
      image = require('../../assets/33-36.png');
    } else {
      image = require('../../assets/37-44.png');
    }
    return image;
  }

  render() {
    return (
      <div className={'weather-image-container'} style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='top'>
          <h2>{this.props.cityName}</h2>
        </div>
        <div className='bottom'>
          <img src={this.handleIcon()} />
        </div>
      </div>
    );
  }
}
