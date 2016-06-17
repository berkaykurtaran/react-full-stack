import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


export default class InfoBar extends Component {

  render() {

    const styles = require('./InfoBar.scss');
    return (
      <div className={styles.infoBar + ' well'}>
        <div className="container">
          This is an info bar
          {' '}


        </div>
      </div>
    );
  }
}
