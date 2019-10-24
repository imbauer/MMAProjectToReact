import React, { Component } from "react";
import mom from 'moment';
import 'moment-timezone';



class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: undefined,
            hours: undefined,
            minutes: undefined,
            seconds: undefined
        };
    }


    componentDidMount() {

        this.interval = setInterval(() => {
            console.log('============ SET INTERVAL CALLED ==============');
            const timeTillDate = this.props.timeTillDate;
            const timeFormat = this.props.timeFormat;
            const timezone = this.props.timezone;
            console.log('HAPPENS VVV');
            console.log(mom.tz.zone('US/Eastern'));
            console.log(timezone);
            const then = mom.tz(timeTillDate, timeFormat, timezone)
            console.log(then);
            console.log('HAPPENS ^^^');

            then.utc();
            const now = mom().tz(timezone)
            now.utc();
            const countdown = mom(then - now)
            // const countdown = then - now;
            const d = Math.floor(countdown / (1000 * 60 * 60 * 24));
            const h = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((countdown % (1000 * 60)) / 1000);
            // const days = countdown.format('D');
            // const hours = countdown.format('HH');
            // const minutes = countdown.format('mm');
            // const seconds = countdown.format('ss');

            this.setState({ days: d, hours: h, minutes: m, seconds: s });
        }, 1000);

    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        let days = this.state.days;
        let hours = this.state.hours;
        let minutes = this.state.minutes;
        let seconds = this.state.seconds;



        // Mapping the date values to radius values
        const daysRadius = mapNumber(Math.abs(days), 30, 0, 0, 360);
        const hoursRadius = mapNumber(Math.abs(hours), 24, 0, 0, 360);
        const minutesRadius = mapNumber(Math.abs(minutes), 60, 0, 0, 360);
        const secondsRadius = mapNumber(Math.abs(seconds), 60, 0, 0, 360);


        return (
            <div className="columns is-multiline is-mobile verticalAlign" style={{margin:0,display:'flex',justifyContent: 'space-between'}}>
                {days >= 0 && (
                    <div className="countdown-item" style={{}}>
                        <SVGCircle radius={daysRadius} />
                        <div style={{}}>{days}</div>
                        <span>days</span>
                    </div>
                )}
                {hours >= 0 && (
                    <div className="countdown-item" style={{}}>
                        <SVGCircle radius={hoursRadius} />
                        <div style={{}}>{hours}</div>
                        <span>hours</span>
                    </div>
                )}
                {minutes >= 0 && (
                    <div className="countdown-item" style={{}}>
                        <SVGCircle radius={minutesRadius} />
                        <div style={{}}>{minutes}</div>
                        <span>minutes</span>
                    </div>
                )}
                {seconds >= 0 && (
                    <div className="countdown-item" style={{}}>
                        <SVGCircle radius={secondsRadius} />
                        <div style={{}}>{seconds}</div>
                        <span>seconds</span>
                    </div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 <= hours && hours <= 0) && (
                    <div>The event is currently underway</div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 >= hours) && (
                    <div className="countdown-item" style={{}}>
                        <SVGCircle radius={daysRadius} />
                        <div style={{}}>{days}</div>
                        <span>days</span>
                    </div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 >= hours) && (
                    <div className="countdown-item" style={{}}>
                        <SVGCircle radius={hoursRadius} />
                        <div style={{}}>{hours}</div>
                        <span>hours</span>
                    </div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 >= hours) && (
                    <div className="countdown-item" style={{}}>
                        <SVGCircle radius={minutesRadius} />
                        <div style={{}}>{minutes}</div>
                        <span>minutes</span>
                    </div>
                )}
                {(days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) && (-2 >= hours) && (
                    <div className="countdown-item" style={{}}>
                        <SVGCircle radius={secondsRadius} />
                        <div style={{}}>{seconds}</div>
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
