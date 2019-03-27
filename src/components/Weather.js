import React, { Component } from 'react';

class Weather extends Component {
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
    const api = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&appid=3e511299402293065a188769c2d4e072`)
    const response = await api.json()
    try
    {
      this.setState({
        temp: response.list[0].main.temp.toFixed(0),
        name: response.city.name,
        conditions: response.list[0].weather[0].description,
        zipCode
      })
    } 
    catch 
    {
      this.setState({ error: 'Please enter a valid zip code' })
    }
    console.log(response)
  }
  render() {
    return (
      <div>
        <h1>Weather around {!this.state.zipCode && <span>...</span>} {this.state.name}</h1>
        {this.state.temp && <p>Temperature: {this.state.temp}°F</p>}
        {this.state.conditions && <p>Conditions: {this.state.conditions}</p>}
        <form onSubmit={this.getWeather}>
          <input type ="text" name="zipCode" placeholder="Enter your zip code"/>
          <input type="submit" value="Get Weather" />
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }
}

export default Weather