import React, { Component } from 'react';
import './App.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';

const FULL_URL = 'https://api.nasa.gov/planetary/apod?api_key=JmJsmp7ZLfBzQgxzkXeNjpfBnTSRCveItaOKzgur'

class DateChanger extends Component{
  constructor(){
    super();
  }

  render(){
    console.log('DONE');
    return(
      <div></div>
    )
  }
}

function POADContent (props){
  return (
    <div  className='container'>
      <h1 className='title'>{props.data.title}</h1>
      <img className='image' src={props.data.url} alt='APOD'></img>
      <p className='text'>{props.data.date}</p>
      <p className='text'>{props.data.explanation}</p>
    </div>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      date: null,
      focused: null
    };
    this.handleDateChange.bind(this);
    fetch(FULL_URL)
      .then(response => response.json())
      .then((response) => {
        this.setState({
          data: response
        })
      });

  }
  handleDateChange(date) {
    let smallDate = date._d.toISOString().slice(0, 10);
    fetch(FULL_URL + '&date=' + smallDate)
      .then(response => response.json())
      .then((response) => {
        this.setState({
          data: response
        })
      });
    this.setState({
      date
    })

  }
  render() {
    let data = this.state.data;
    return (
      <div>
        <div>
        
          <POADContent data={data}/>
          <DateChanger date={this.state.date} focused={this.state.focused} />
          <DayPickerSingleDateController
            onDateChange={date => this.handleDateChange(date)}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            date={this.state.date}
            numberOfMonths={1}
            displayFormat='YYYY-MM-DD'
            hideKeyboardShortcutsPanel={true}
            isOutsideRange={(date) => { return date._d > new Date() }}
          />
        </div>

      </div>
    );
  }
}

export default App;
