import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import requireWeather from "./requireWeather";
import Chart from "../components/chart";
import { kelvinToCelcius } from "../components/util";
import * as actions from "../actions";
class Weather extends Component {
  constructor(props) {
    super(props);
    this.renderWeatherList = this.renderWeatherList.bind(this);
    this.state = {
      showWeekly: true
    };
  }

  renderWeatherList(data) {
    const { showWeekly } = this.state;
    let currentCity = data[0];
    let forecast = data[1];
    let currentTemp = kelvinToCelcius(currentCity.main.temp);
    let currentMax = kelvinToCelcius(currentCity.main.temp_max);
    let currentMin = kelvinToCelcius(currentCity.main.temp_min);
    let currentPressure = currentCity.main.pressure;
    const temps = forecast.list.map(weather =>
      kelvinToCelcius(weather.main.temp)
    );
    const pressures = forecast.list.map(weather => weather.main.pressure);

    return (
      <tr key={currentCity.name} className="tempTable">
        <td className="tFont">{currentCity.name}</td>
        <td>
          <div className={showWeekly ? undefined : "tempStyle"}>
            <div className="tFont">
              {currentTemp}
              &#176;
            </div>
            <div className={showWeekly ? undefined : "highLow"}>
              <div>
                H:
                {currentMax}
                &#176;
              </div>
              <div>
                L:
                {currentMin}
                &#176;
              </div>
            </div>
          </div>
        </td>
        <td className="tFont">{currentCity.weather[0].description}</td>
        <td className="tFont">{currentPressure}</td>
        {showWeekly && (
          <td>
            <Chart data={temps} color="orange" units="C" />
          </td>
        )}
        {showWeekly && (
          <td>
            <Chart data={pressures} color="blue" units="kPa" />
          </td>
        )}
      </tr>
    );
  }
  render() {
    const { showWeekly } = this.state;
    const { location, weather } = this.props;

    return (
      <div className="container">
        <Button
          className="btn"
          onClick={() => this.setState({ showWeekly: !this.state.showWeekly })}
        >
          Toggle 5-Day
        </Button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th colSpan="4" className="today">
                Today
              </th>
              {showWeekly && (
                <th colSpan="2" className="fiveDay">
                  5 Day Forecast
                </th>
              )}
            </tr>
          </thead>
          <thead>
            <tr>
              <th>City</th>
              <th>Temp (C)</th>
              <th>Condition</th>
              <th>Pressure (kPa)</th>
              {showWeekly && <th className="fiveDayInfo">Temperature (C)</th>}
              {showWeekly && <th className="fiveDayInfo">Pressure (kPa)</th>}
            </tr>
          </thead>
          <tbody>
            {location &&
              weather &&
              weather[0] &&
              weather[0][0] &&
              weather[0][0][0] &&
              weather[0][0][0].main &&
              weather[0].map(this.renderWeatherList)}
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(
  null,
  actions
)(requireWeather(Weather));
