import * as React from 'react';
interface IProps {
  day: string;
  temperature: string;
  image: any;
}

interface IState {}

export default class ForcastDay extends React.Component<IProps, IState> {
  render() {
    const { day, temperature, image } = this.props;

    return (
      <div className='forcast-day-container'>
        <div className='forcast-day-content'>
          <p>{day}</p>
          <p>{temperature}</p>
        </div>
        <div className='forcast-day-icon'>
          <img src={image} alt='Sunny' />
        </div>
      </div>
    );
  }
}
