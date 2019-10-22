import React, { Component } from "react";
import Moment from 'react-moment';
import mom from 'moment';
import 'moment-timezone';



class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat, timezone} = this.props;
            console.log('HAPPENS VVV');
            const then = mom.tz(timeTillDate, timeFormat, timezone)
            console.log('HAPPENS ^^^');

            then.utc();
            const now = mom().tz(timezone)
            now.utc();
            const countdown = mom(then - now)
            // const countdown = then - now;
            const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
            const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
            // const days = countdown.format('D');
            // const hours = countdown.format('HH');
            // const minutes = countdown.format('mm');
            // const seconds = countdown.format('ss');

            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        let { days, hours, minutes, seconds } = this.state;



        // Mapping the date values to radius values
        const daysRadius = mapNumber(Math.abs(days), 30, 0, 0, 360);
        const hoursRadius = mapNumber(Math.abs(hours), 24, 0, 0, 360);
        const minutesRadius = mapNumber(Math.abs(minutes), 60, 0, 0, 360);
        const secondsRadius = mapNumber(Math.abs(seconds), 60, 0, 0, 360);


        return (
            <div className="columns is-multiline is-mobile verticalAlign" style={{margin:0}}>
                {days >= 0 && (
                    <div className="column countdown-item" style={{textAlign:'center'}}>
                        <SVGCircle radius={daysRadius} />
                        {days}
                        <span>days</span>
                    </div>
                )}
                {hours >= 0 && (
                    <div className="column countdown-item" style={{textAlign:'center'}}>
                        <SVGCircle radius={hoursRadius} />
                        {hours}
                        <span>hours</span>
                    </div>
                )}
                {minutes >= 0 && (
                    <div className="column countdown-item" style={{textAlign:'center'}}>
                        <SVGCircle radius={minutesRadius} />
                        {minutes}
                        <span>minutes</span>
                    </div>
                )}
                {seconds >= 0 && (
                    <div className="column countdown-item" style={{textAlign:'center'}}>
                        <SVGCircle radius={secondsRadius} />
                        {seconds}
                        <span>seconds</span>
                    </div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 <= hours && hours <= 0) && (
                    <div>The event is currently underway</div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 >= hours) && (
                    <div className="column countdown-item" style={{textAlign:'center',backgroundColor:'teal'}}>
                        <SVGCircle radius={daysRadius} />
                        {days}
                        <span>days</span>
                    </div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 >= hours) && (
                    <div className="column countdown-item" style={{textAlign:'center',backgroundColor:'yellow'}}>
                        <SVGCircle radius={hoursRadius} />
                        {hours}
                        <span>hours</span>
                    </div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 >= hours) && (
                    <div className="column countdown-item" style={{textAlign:'center',backgroundColor:'orange'}}>
                        <SVGCircle radius={minutesRadius} />
                        {minutes}
                        <span>minutes</span>
                    </div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 >= hours) && (
                    <div className="column countdown-item" style={{textAlign:'center',backgroundColor:'blue'}}>
                        <SVGCircle radius={secondsRadius} />
                        {seconds}
                        <span>seconds</span>
                    </div>
                )}
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            strokeWidth="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}


export default Countdown;
