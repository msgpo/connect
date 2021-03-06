/**
 * comma Launch Screen
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import CarouselPager from 'react-native-carousel-pager';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { attemptGoogleAuth } from '../../../actions/async/Auth';
import { Assets } from '../../../constants';
import X from '../../../theme';
import Styles from '../AuthStyles';

type Props = {};

class AuthIntro extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    }
    this.handleSlideChanged = this.handleSlideChanged.bind(this);
  }

  handleSlideChanged(activeSlide) {
    return this.setState({ activeSlide });
  }

  handlePressedGoogleSignin() {
    this.props.attemptGoogleAuth();
  }

  componentWillReceiveProps(newProps) {
    const { navigate } = this.props.navigation;
    if (newProps.auth.commaUser) {
      navigate('AppLoader');
    }
  }

  render() {
    const { activeSlide } = this.state;
    const { navigation, auth } = this.props;
    return (
      <View style={ Styles.authIntro }>
        <View style={ Styles.authIntroSlide } key='page0'>
          <X.Image
            style={ Styles.authIntroSlideCover }
            source={ Assets.commaWhite } />
          <View style={ Styles.authIntroSlideHeader }>
            <X.Text color='white' weight='semibold'>
              Welcome to comma
            </X.Text>
          </View>
          <View style={ Styles.authIntroSlideSubheader }>
            <X.Text color='lightGrey' weight='light'>
              Experience the future of driving
            </X.Text>
          </View>
        </View>
        <X.Entrance style={ Styles.authIntroActions }>
          <View style={ Styles.authIntroAction }>
            <X.Button
              textColor='#111'
              onPress={ this.props.attemptGoogleAuth }>
              { auth.isAuthenticating ? 'Logging in...' : ' Log in with Google' }
            </X.Button>
          </View>
        </X.Entrance>
        <View style={ Styles.authIntroSlidesCrumbs }>
        </View>
      </View>
    );
  }

}

function mapStateToProps(state) {
  const { auth, } = state;
  return {
    auth,
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    attemptGoogleAuth: () => {
      dispatch(attemptGoogleAuth());
    },
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(AuthIntro))
