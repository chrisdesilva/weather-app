import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        isLoaded: false,
        error: undefined,
        temp: undefined,
        name: undefined,
        zipCode: undefined,
        conditions: undefined
    }
  }
  
  getWeather = async (e) => {
    e.preventDefault();
    const zipCode = e.target.elements.zipCode.value;
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=3e511299402293065a188769c2d4e072`)
    const response = await api.json()
    if(zipCode.length === 5){
      this.setState({
        temp: response.main.temp.toFixed(0),
        name: response.name,
        conditions: response.weather[0].description
      })
    } else {
      this.setState({ error: 'Please enter a valid zip code' })
    }
    console.log(response)
  }
  
  render() {
    return (
      <div className="App">
        <h1>Weather in {this.state.name}</h1>
        <p>Temperature: {this.state.temp}°F</p>
        <p>Conditions: {this.state.conditions}</p>
        <form onSubmit={this.getWeather}>
          <input type ="text" name="zipCode" placeholder="Enter your zip code"/>
          <input type="submit" value="Get Weather" />
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default App;
