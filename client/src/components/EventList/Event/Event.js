import React, { Component } from "react";
import Moment from 'react-moment';
import mom from 'moment';
import 'moment-timezone';
import Countdown from './Countdown/Countdown'




class ToggleBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // toggle box is closed initially
      isOpened: false,
    };
    // http://egorsmirnov.me/2015/08/16/react-and-es6-part3.html
    this.toggleBox = this.toggleBox.bind(this);
  }

  toggleBox() {
    this.setState(oldState => ({ isOpened: !oldState.isOpened }));
  }

  render() {
    const { title, children } = this.props;
    const { isOpened } = this.state;
    return (
      <div className="box">
        <div className="boxTitle" onClick={this.toggleBox}>
          {title}
        </div>
        {isOpened && children && (
          <div className="boxContent">
            {children}
          </div>
        )}
      </div>
    );
  }
}











class Event extends Component {
    constructor(props) {
        super(props);
        this.changeTimezone = this.changeTimezone.bind(this);
        this.getCountDown = this.getCountDown.bind(this);
        this.state = {
            timeObject: props.result.when.weekDay.substring(0, 3) + ' ' + props.result.when.monthString.substring(0, 3) + ' ' + props.result.when.day  + ' ' +
            props.result.when.year + ' ' + props.result.when.hour + ':' + props.result.when.minute + ':00 ' + ' ' + props.result.when.offset,
            selectValue: props.selectValue,
            countDown: props.result.when.day
        };
    }

    // getCountDown(month, day, year, hour, minute, second) {
    getCountDown() {

    }

    changeTimezone() {
        console.log(this.state.selectValue);
        var time = mom(new Date(this.state.timeObject.split(':00 ')[0])).format('YYYY-MM-DD HH:mm');
        var offset = this.state.timeObject.split(':00 ')[1].trim();
        console.log(time);
        console.log(offset);
        var currentTime = mom.tz(time.toString(), offset);
        var differentTime = currentTime.clone().tz(this.state.selectValue);
        console.log(currentTime);
        console.log(differentTime);
        console.log('New Region: ' + this.state.selectValue);
        this.setState({ timeObject: differentTime.toString().replace(/GMT.*/g, this.state.selectValue) })
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.selectValue !== newProps.selectValue) {
            this.setState({ selectValue: newProps.selectValue },
            function() {
                this.changeTimezone();
            });
        }
        if(oldProps.result.when.monthString !== newProps.result.when.monthString || oldProps.result.when.hour !== newProps.result.when.hour || oldProps.result.when.year !== newProps.result.when.year || oldProps.result.when.day !== newProps.result.when.day) {
            this.setState({ timeObject: newProps.result.when.weekDay.substring(0, 3) + ' ' + newProps.result.when.monthString.substring(0, 3) + ' ' + newProps.result.when.day +
            ' ' + newProps.result.when.year + ' ' + newProps.result.when.hour + ':' + newProps.result.when.minute + ':00 ' + ' ' + newProps.result.when.offset});
            this.setState({ countDown: newProps.result.when.day },
            function() {

                console.log(this.state.countDown);
            });
        }
        console.log();
        console.log('---------------------');
        console.log(this.state.selectValue);
        console.log('---------------------');
        console.log();
    }

    render() {
        var dDate = this.state.timeObject.replace(/:00 .*/g, '');
        var timezone = this.state.timeObject.replace(/.*:00 /g, '');
        return (
            <div>
            <div className="columns height is-vcentered work__list-item is-mobile" style={{ textAlign:'center',position: 'relative',marginTop:1+'px',marginBottom:1+'px' }}>

                <div className="column height countdown-wrapper" style={{ fontSize:1.7+'em',textAlign:'center' }}>

                    <Countdown timeTillDate={dDate} timeFormat="ddd MMM DD YYYY HH:mm" timezone={timezone} />

                </div>

                {this.props.result.promotion === "Ultimate Fighting Championship" &&
                    <div className="column height big-text is-two-fifths ufcBackground">
                        <div className="verticalAlign">
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
                                {this.props.result.event}
                        </h1>
                        <div>{this.props.result.title}</div>
                        </div>
                    </div>
                }
                {this.props.result.promotion === "Bellator" &&
                    <div className="column height big-text is-two-fifths bellatorBackground">
                        <div className="verticalAlign">
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
                                {this.props.result.event}
                        </h1>
                        <div>{this.props.result.title}</div>
                        </div>
                    </div>
                }

                {this.props.result.location !== undefined &&
                    <div className="column height">
                        <div className="verticalAlign textRotate inner countdown-item">
                            {this.state.timeObject}
                        </div>
                        <div className={`flag-icon-background flag-icon-${this.props.result.location.co}`} style={{ zIndex:-1,opacity:0.5,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                        </div>
                    </div>
                }
                {this.props.result.location === undefined &&
                    <div className="column height clockDiv" style={{ fontSize:1.7+'em',textAlign:'center' }}>
                        PlaceHolder
                    </div>
                }




            </div>


            </div>
        )
    }
}


export default Event;
