import * as React from 'react';
import { observer } from 'mobx-react';
import rootStores from '../../stores';
import debounce from 'lodash/debounce';

interface IProps {}
interface IState {
  mobileDesktopImage: string;
}

@observer
export default class AddRemoveButton extends React.Component<IProps, IState> {
  mobileImage: any = require('../../assets/add-favorites-mobile.png');
  desktopImage: any = require('../../assets/add-favorites-desktop.png');
  mobileMaxWidth: number = 1000;

  constructor(props: any) {
    super(props);
    const screenWidth = window.innerWidth;
    this.state = {
      mobileDesktopImage: screenWidth > this.mobileMaxWidth ? this.desktopImage : this.mobileImage
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.renderButton);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.renderButton);
  }

  renderButton = () => {
    const screenWidth = window.innerWidth;

    screenWidth > this.mobileMaxWidth
      ? this.setState({ mobileDesktopImage: this.desktopImage })
      : this.setState({ mobileDesktopImage: this.mobileImage });
  };

  render() {
    return (
      <div className={'add-remove-button'}>
        <img src={this.state.mobileDesktopImage} />
      </div>
    );
  }
}
