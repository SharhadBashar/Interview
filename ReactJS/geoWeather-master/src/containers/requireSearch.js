import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchCurrent,
  fetchWeek,
  fetchWeather,
  fetchLocation
} from "../actions/index";
export default ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { fetchCurrent, fetchWeek, fetchWeather, fetchLocation },
      dispatch
    );
  }
  function mapStateToProps(state) {
    return {
      current: state.current,
      week: state.week,
      weather: state.weather,
      location: state.location
    };
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ComposedComponent);
};
