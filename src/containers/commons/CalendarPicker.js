import React from 'react'
import ReactDOM from 'react-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import $ from 'jquery'
import 'react-datepicker/dist/react-datepicker.css'

const { Contants } = require('../../core/constants')
class Portal extends React.Component {
    constructor(...args) {
        super(...args)
        this.id = this.props.id

        this.handleScroll = this.handleScroll.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleBaseBlur = this.handleBaseBlur.bind(this)

        this.state = {
            selectedDate: moment()
        }
    }

    mountPortal() {
        var parentID = this.props.id
        this.target = document.createElement('div');
        document.body.appendChild(this.target);

        this.target.style.position = 'absolute'
        this.target.style.zIndex = '3'
        this.target.className = 'calendar-picker'
        this.target.id = 'calendar-picker'
        var x = document.getElementById(parentID).getBoundingClientRect()
        let offX = x.left, offY = x.top, hei = x.height
        this.target.style.transform = 'translateX(' + offX + 'px) translateY(' + (offY + hei) + 'px)'

        document.body.addEventListener("click", this.handleBaseBlur, false)
        this.renderPortal()

    }

    handleScroll() {
        var x = document.getElementById(this.id).getBoundingClientRect()
        let offX = x.left, offY = x.top, hei = x.height
        this.target.style.transform = 'translateX(' + offX + 'px) translateY(' + (offY + hei) + 'px)'
    }


    handleBaseBlur(e) {
        var target = e.target.className
        if (target.includes('react-datepicker__current-month') || target.includes('react-datepicker__navigation') ||
            target.includes('react-datepicker__day-name') || target.includes('react-datepicker__month-container') ||
            target.includes('react-datepicker__week') || e.target.id === this.props.id ||
            target.includes('react-datepicker__today-button') || target.includes('react-datepicker__day')) {

        } else {
            this.props.onBlur()
        }
    }

    unMountPortal() {
        ReactDOM.unmountComponentAtNode(this.target);
        document.body.removeChild(this.target);
        document.body.removeEventListener("click", this.handleBaseBlur, false)
        document.getElementById('pagecontent').removeEventListener('scroll', this.handleScroll, false);
    }

    componentDidMount() {
        this.mountPortal()
    }

    componentWillUpdate() {
        this.unMountPortal()
        this.mountPortal()
    }

    componentWillUnmount() {
        this.unMountPortal()
    }

    handleChange(date) {
        this.props.onClick(date)
    }

    renderPortal() {
        let date = this.props.date
        if (date.format(Contants.dateFormat) == 'Invalid date') {
            date = moment()
        }
        ReactDOM.render(
            <DatePicker
                inline
                selected={date}
                onChange={this.handleChange}
                todayButton="Today"
            />
            ,

            this.target
        )

        document.getElementById('pagecontent').addEventListener('scroll', this.handleScroll, false);
    }

    render() {
        return null
    }
}

class CalendarPicker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showPicker: false,
            selectedDate: this.props.selected,
        }
        this.id = this.props.id + "-calendar-picker-" + (new Date()).getTime()


        this.handleCanlendarClick = this.handleCanlendarClick.bind(this)
        this.handleCanlendarBlur = this.handleCanlendarBlur.bind(this)
        this.handleInputFocus = this.handleInputFocus.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputKeyUp = this.handleInputKeyUp.bind(this)
    }

    removeAllCalendarPicker() {
        var x = document.getElementById('calendar-picker')
        console.log(x)
        if (x) {
            document.body.removeChild(x)

        }
    }

    handleInputFocus(e) {
        this.setState({ showPicker: !this.state.showPicker })
    }

    handleInputChange(e) {
        const myDate = moment(e.target.value, Contants.dateFormat)

        this.setState({
            selectedDate: Object.assign(this.state.selectedDate, myDate)
        })

        this.props.onChange(myDate)
    }

    handleInputKeyUp(e) {
        if (!e.ctrlKey && !e.metaKey && e.keyCode > 46 && e.target.value.length < 10) {
            // var format = 'dd/mm/yyyy';

            // var match = new RegExp(format
            //     .replace(/(\w+)\W(\w+)\W(\w+)/, "^\\s*($1)\\W*($2)?\\W*($3)?([0-9]*).*")
            //     .replace(/m|d|y/g, "\\d"));

            // var replace = "$1/$2/$3$4"
            //     .replace(/\//g, format.match(/\W/));


            // document.getElementById(this.id).value = document.getElementById(this.id).value
            //     .replace(/(^|\W)(?=\d\W)/g, "$10")   // padding
            //     .replace(match, replace)             // fields
            //     .replace(/(\W)+/g, "$1");            // remove repeats

        }
        else if (e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39) {

        }
        else if (e.keyCode == 13) {
            e.preventDefault()
            this.setState({ showPicker: false })
            if (this.props.onEnter !== undefined) {
                this.props.onEnter()
            }
        }
        else {
            e.preventDefault()
        }
    }

    handleCanlendarClick(date) {
        this.setState({ showPicker: false, selectedDate: date })
        document.getElementById(this.id).value = date.format(Contants.dateFormat)

        this.props.onChange(date)
    }

    handleCanlendarBlur() {
        this.setState({ showPicker: false })
    }

    render() {

        return (
            <div style={{ display: 'inline-block' }}>
                <input id={this.id} className="calendar-picker-input"
                    onClick={this.handleInputFocus}
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleInputKeyUp}
                    defaultValue={this.state.selectedDate.format(Contants.dateFormat)}
                    placeholder={Contants.dateFormat}
                    type="text"
                    disabled={this.props.disabled}
                />
                {
                    this.state.showPicker ?
                        <Portal key={this.id} id={this.id}
                            onClick={this.handleCanlendarClick}
                            onBlur={this.handleCanlendarBlur}
                            date={this.state.selectedDate}
                        />
                        : null
                }
            </div>
        )
    }
}

CalendarPicker.defaultProps = {
    disabled: false,
    selected: moment()
}

export default CalendarPicker;