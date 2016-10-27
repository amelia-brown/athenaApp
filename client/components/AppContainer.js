import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Cookies from 'js-cookie';
import Nav from './Nav/Nav';

import * as actionCreators from '../actions/index';


class AppContainer extends React.Component {
  constructor(props) {
    super(props)
  }


  render () {
    return (
      <div className="landing-page">
      <Nav location={this.props.location} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    currentUser: store.userReducer.currentUser
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
