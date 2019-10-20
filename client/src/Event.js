import React, { Component } from "react";
import moment from 'moment';
import timezone from 'moment-timezone'


class Event extends Component {
    constructor(props) {
        super(props);
        this.changeTimezone = this.changeTimezone.bind(this);
        this.state = {
            timeObject: props.result.when.monthString.substring(0, 3) + ' ' + props.result.when.weekDay.substring(0, 3) + ' ' + props.result.when.day  + ' ' +
            props.result.when.year + ' ' + props.result.when.hour + ':' + props.result.when.minute + ':00 ' + ' ' + props.result.when.offset,
            selectValue: props.selectValue
        };
    }

    changeTimezone() {
        console.log(this.state.selectValue);
        var time = moment(new Date(this.state.timeObject.split(':00 ')[0])).format('YYYY-MM-DD HH:mm');
        var offset = this.state.timeObject.split(':00 ')[1].trim();
        console.log(time);
        console.log(offset);
        var currentTime = moment.tz(time.tostring(), offset);
        var differentTime = currentTime.clone().tz(this.state.selectValue);
        console.log(currentTime);
        console.log(differentTime);
        console.log('New Region: ' + this.state.selectValue);
        this.setState({ timeObject: differentTime.tostring().replace(/GMT.*/g, this.state.selectValue) })
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.selectValue !== newProps.selectValue) {
            this.setState({ selectValue: newProps.selectValue },
            function() {
                this.changeTimezone();
            });
        }
        if(oldProps.result.when.monthString !== newProps.result.when.monthString) {
            this.setState({ timeObject: newProps.result.when.monthString.substring(0, 3) + ' ' + newProps.result.when.weekDay.substring(0, 3) + ' ' + newProps.result.when.day +
            ' ' + newProps.result.when.year + ' ' + newProps.result.when.hour + ':' + newProps.result.when.minute + ':00 ' + ' ' + newProps.result.when.offset})
        }
    }

    render() {
        var ufcImage=require('./ufcLogo30.png')
        return (
            <div className="columns height is-vcentered work__list-item is-mobile" style={{ textAlign:'center',position: 'relative' }}>

                <div className="column height clockDiv" style={{ fontSize:1.7+'em',textAlign:'center' }}>
                    PlaceHolder
                </div>


                <div className="column height big-text is-two-fifths" style={{ backgroundSize:30+'%',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundImage:'url(' + ufcImage + ')' }}>
                    <div class="verticalAlign">
                    {this.props.result.location !== undefined && this.props.result.location.name && this.props.result.location.city && this.props.result.location.provState && this.props.result.location.country &&
                      <h2>
                        {this.props.result.location.name}, {this.props.result.location.city}, {this.props.result.location.provState}, {this.props.result.location.country}
                      </h2>
                    }
                    {this.props.result.location !== undefined && this.props.result.location.name && this.props.result.location.city && !this.props.result.location.provState && this.props.result.location.country &&
                      <h2>
                        {this.props.result.location.name}, {this.props.result.location.city}, {this.props.result.location.country}
                      </h2>
                    }
                    {this.props.result.location === undefined &&
                      <h2>
                        NO LOCATION
                      </h2>
                    }

                    <h1 className="eventTitle" style={{ marginBottom:5+'%',marginTop:5+'%' }}>
                            {this.props.result.otherName}
                    </h1>
                    <div>{this.props.result.title}</div>
                    </div>
                </div>

                {this.props.result.location !== undefined &&
                    <div className={`column height clockRight flagRotate clockP time flag-icon-background flag-icon-${this.props.result.location.co}`} style={{ backgroundSize:'cover',fontSize:1.7+'em',zIndex:2,fontWeight:600 }}>
                        <div class="verticalAlign textRotate">
                            {this.state.timeObject}
                            {this.state.selectValue}
                        </div>
                    </div>
                }
                {this.props.result.location === undefined &&
                    <div className="column height clockDiv" style={{ fontSize:1.7+'em',textAlign:'center' }}>
                        PlaceHolder
                    </div>
                }



            </div>
        )
    }
}


export default Event;
