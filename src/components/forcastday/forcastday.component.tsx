import * as React from 'react';
interface IProps {
  day: string;
  temperature: string;
  image: any;
  onClickAction: any;
}

interface IState {}

export default class ForcastDay extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { day, temperature, image, onClickAction } = this.props;

    return (
      <div className='forcast-day-container' onClick={() => onClickAction()}>
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
