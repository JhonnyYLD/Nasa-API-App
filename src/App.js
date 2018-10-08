import React, { Component } from 'react';
import './App.css';
import POADContent from './POADContent';
import Navigation from './Navigation';
const FULL_URL = 'https://api.nasa.gov/planetary/apod?api_key=JmJsmp7ZLfBzQgxzkXeNjpfBnTSRCveItaOKzgur';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      date: null,
      loading: true
    };
    this.handleDateChange = this.handleDateChange.bind(this);

  }
  getData(params) {
    let url = `${FULL_URL}${params ? params : ''}`
    fetch(url)
      .then(response => response.json())
      .then((response) => {
        if (response.media_type === 'image') {
          const image = new Image();
          image.onload = () => {
            this.setState({ data: response, loading: false, image: image })
          };
          image.onerror = () => {
            this.setState({ data: response, loading: false, image: image })
          };
          image.src = response.url;
        }
        else {
          this.setState({ data: response, loading: false })
        }
      });
  }
  componentDidMount() {
    this.getData();
  }
  handleDateChange(date) {
    //let smallDate = date._d.toISOString().slice(0, 10);
    let year = date._d.getFullYear();
    let month = date._d.getMonth() + 1;
    let day = date._d.getDate();
    let smallDate = `${year}-${month < 10 ? '0' + month : month}-${day}`;
    this.getData(`&date=${smallDate}`)
    this.setState({ date, loading: true });
  }
  render() {
    let data = this.state.data;
    return (
      <div>
        <div>
          <POADContent
            data={data}
            image = {this.state.image}
            loading={this.state.loading}
          />
          <Navigation
            date={this.state.date}
            handleDateChange={this.handleDateChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
