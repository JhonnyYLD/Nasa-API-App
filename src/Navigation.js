import React, { Component} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';


class DateChanger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false
        }
        this.toggleCalendar = this.toggleCalendar.bind(this);

    }
    printThis(toPrint) {
        console.log(toPrint)
    }
    toggleCalendar(){
        this.setState(state =>  ({ focused:!state.focused }));
    }
    render() {
        return (
            <div>
                <button
                    onClick={this.toggleCalendar}
                    >Change Date
                </button>
                {this.state.focused && <DayPickerSingleDateController
                    onDateChange={this.props.handleDateChange}
                    date={this.props.date}
                    numberOfMonths={this.props.numberOfMonths}
                    hideKeyboardShortcutsPanel={this.props.hideKeyboardShortcutsPanel}
                    isOutsideRange={this.props.isOutsideRange}
                />
                }
            </div>
        )
    }
}
DateChanger.defaultProps = {
    numberOfMonths: 1,
    hideKeyboardShortcutsPanel: true,
    isOutsideRange: (date) => {
        date._d.setHours(1, 0, 0, 0);
        return date._d > new Date()
    }
}

class Navigation extends Component {
    render() {
        return (
            <div className='container'>
                <DateChanger
                    date={this.props.date}
                    handleDateChange={this.props.handleDateChange}
                />
            </div>
        )
    }
}

export default Navigation;