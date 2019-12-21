import * as React from 'react';
interface IProps {
  day: string;
  temperature: string;
  image: any;
  onClickAction: any;
  cityName?: string;
  uniqueID?: number;
}

interface IState {}

export default class ForcastDay extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { day, temperature, image, onClickAction } = this.props;

    return (
      <div
        className={`forcast-day-container ${this.props.uniqueID ? this.props.uniqueID : ''}`}
        onClick={() => onClickAction()}>
        <div className='forcast-day-content'>
          {this.props.cityName && <p>{this.props.cityName}</p>}
          <p>{day}</p>
          <p>{temperature}</p>
        </div>
        <div className='forcast-day-icon'>{image && <img src={image} />}</div>
      </div>
    );
  }
}
