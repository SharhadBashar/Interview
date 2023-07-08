import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import requireSearch from "./requireSearch";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "", text: "Getting Your Location..." };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
  }
  componentDidMount() {
    this.getLocation();
  }
  componentDidUpdate(prevProps) {
    const { week, current, location } = this.props;
    if (
      (week !== prevProps.week || current !== prevProps.current) &&
      current.length === week.length
    ) {
      this.props.fetchWeather(current, week);
    }
    if (location !== prevProps.location) {
      this.props.fetchCurrent(location[0]);
      this.props.fetchWeek(location[0]);
    }
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.setState({ text: "Geolocation is not supported by this browser." });
    }
  }
  showPosition(position) {
    this.props.fetchLocation(
      position.coords.latitude,
      position.coords.longitude
    );
  }
  onInputChange(event) {
    this.setState({ term: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.fetchCurrent(this.state.term);
    this.props.fetchWeek(this.state.term);
    this.setState({ term: "" });
  }
  render() {
    const { location } = this.props;
    const { term, text } = this.state;
    return (
      <div className="searchBar">
        {location.length === 0 && <h2>{text}</h2>}
        <div>
          <input
            placeholder="Insert Additional Canadian City"
            value={term}
            onChange={this.onInputChange}
          />
          <button onClick={this.onSubmit} disabled={location.length === 0}>
            Check
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(requireSearch(SearchBar));
