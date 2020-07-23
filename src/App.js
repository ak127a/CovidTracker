import React, { Component } from "react";
import { animated, useSpring } from "react-spring";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import CoronaImg from "./images/image.png";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const AnimatedImg = () => {
  const fade = useSpring({
    from: { opacity: 0, marginRight: "-1000px" },
    to: { opacity: 1, marginRight: 0 },
  });

  return (
    <animated.div style={fade}>
      <img className={styles.image} alt="Covid-19" src={CoronaImg} />
    </animated.div>
  );
};

export class App extends Component {
  state = {
    data: {},
    country: "",
  };

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country });
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  render() {
    const { data, country } = this.state;
    return (
      <ThemeProvider theme={darkTheme}>
        <div className={styles.container}>
          <AnimatedImg />
          <Cards data={data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
