import React, { Component } from "react";
import { connect } from "react-redux";
export default ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      current: state.current,
      week: state.week,
      weather: state.weather,
      location: state.location
    };
  }
  return connect(mapStateToProps)(ComposedComponent);
};
