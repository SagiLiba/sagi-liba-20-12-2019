import * as React from 'react';
import Forcast from '../forcast/forcast.component';

interface IProps {
  history?: any;
}

interface IState {}

export default class Homepage extends React.Component<IProps, IState> {
  render() {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={require('../../assets/sun.png')} alt='Sunny' />
        </div>
        <Forcast />
      </>
    );
  }
}
