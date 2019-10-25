import React, { Component } from "react";
import mom from 'moment';
import 'moment-timezone';

import Countdown from './Countdown/Countdown'
import FightList from './FightList/FightList'


class Event extends Component {
    constructor(props) {
        super(props);
        this.changeTimezone = this.changeTimezone.bind(this);
        this.changeHiddenDiv = this.changeHiddenDiv.bind(this);
        this.state = {
            result: undefined,
            timeObject: undefined,
            selectValue: undefined,
            hidden: undefined
        };
    }


    changeTimezone() {
        console.log('============ CHANGE TIMEZONE CALLED ==============');
        console.log(this.state.selectValue);
        console.log(this.state.timeObject);
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

    changeHiddenDiv() {
        this.setState({ hidden: !this.state.hidden });
    }



    componentDidMount() {
        const timeObject = this.props.result.when.weekDay.substring(0, 3) + ' ' + this.props.result.when.monthString.substring(0, 3) + ' ' + this.props.result.when.day +
        ' ' + this.props.result.when.year + ' ' + this.props.result.when.hour + ':' + this.props.result.when.minute + ':00 ' + ' ' + this.props.result.when.offset;
        const selectValue = this.props.selectValue;
        this.setState({ selectValue: selectValue },
        function() {
            this.changeTimezone();
        });
        this.setState({ timeObject: timeObject},
        function() {
            this.changeTimezone();
        });
        this.setState({ hidden: true });
    }


    componentDidUpdate(oldProps) {
        const timeObject = this.props.result.when.weekDay.substring(0, 3) + ' ' + this.props.result.when.monthString.substring(0, 3) + ' ' + this.props.result.when.day +
        ' ' + this.props.result.when.year + ' ' + this.props.result.when.hour + ':' + this.props.result.when.minute + ':00 ' + ' ' + this.props.result.when.offset;
        const selectValue = this.props.selectValue;
        const result = this.props.result;


        if (oldProps.selectValue !== selectValue) {
            this.setState({ selectValue: selectValue },
            function() {
                this.changeTimezone();
            });
        }

        if(oldProps.result !== result) {
            this.setState({ timeObject: this.props.result.when.weekDay.substring(0, 3) + ' ' + this.props.result.when.monthString.substring(0, 3) + ' ' + this.props.result.when.day +
            ' ' + this.props.result.when.year + ' ' + this.props.result.when.hour + ':' + this.props.result.when.minute + ':00 ' + ' ' + this.props.result.when.offset},
            function() {
                this.changeTimezone();
            });
            this.setState({ hidden: true });
        }

    }

    // componentWillUnmount() {
    //     this.setState({hidden: true});
    // }

    render() {
        console.log(this.state.timeObject);
        if (this.state.timeObject !== undefined) {
            var dDate = this.state.timeObject.replace(/:00 .*/g, '');
            var timezone = this.state.timeObject.replace(/.*:00 /g, '');
        }
        return (
            <div>
                <div className="columns height is-vcentered work__list-item is-mobile is-gapless" onClick={this.changeHiddenDiv} style={{ textAlign:'center',position: 'relative',marginTop:1+'px',marginBottom:1+'px' }}>

                    <div className="column height countdown-wrapper" style={{ fontSize:1.7+'em',textAlign:'center' }}>

                        {this.state.timeObject !== undefined &&
                            <Countdown timeTillDate={dDate} timeFormat="ddd MMM DD YYYY HH:mm" timezone={timezone} />
                        }

                    </div>

                    {this.props.result.promotion === "Ultimate Fighting Championship" &&
                        <div className="column height big-text is-two-fifths ufcBackground">

                            {this.props.result.location !== undefined && this.props.result.location.name && this.props.result.location.city && this.props.result.location.provState && this.props.result.location.country &&
                              <h2 className="mobileLocation eventElementTop">
                                {this.props.result.location.name}, {this.props.result.location.city}, {this.props.result.location.provState}, {this.props.result.location.country}
                              </h2>
                            }
                            {this.props.result.location !== undefined && this.props.result.location.name && this.props.result.location.city && !this.props.result.location.provState && this.props.result.location.country &&
                              <h2 className="mobileLocation eventElementTop">
                                {this.props.result.location.name}, {this.props.result.location.city}, {this.props.result.location.country}
                              </h2>
                            }
                            {this.props.result.location === undefined &&
                              <h2 className="mobileLocation eventElementTop">
                                NO LOCATION
                              </h2>
                            }
                            <div className="verticalAlign" style={{}}>
                                <h1 className="eventTitle">
                                    {(this.props.result.event === this.props.result.otherName || this.props.result.otherName === undefined) &&
                                        <div>{this.props.result.name}</div>
                                    }
                                    {(this.props.result.event !== this.props.result.otherName && this.props.result.otherName !== undefined) &&
                                        <div>{this.props.result.otherName}</div>
                                    }
                                </h1>
                            </div>
                            <div style={{position:'absolute',bottom:5+'%',left: 0,right: 0,marginLeft: 'auto',marginRight: 'auto'}}>{this.props.result.title}</div>
                        </div>
                    }
                    {this.props.result.promotion === "Bellator" &&
                        <div className="column height big-text is-two-fifths bellatorBackground">

                            {this.props.result.location !== undefined && this.props.result.location.name && this.props.result.location.city && this.props.result.location.provState && this.props.result.location.country &&
                              <h2 className="mobileLocation eventElementTop">
                                {this.props.result.location.name}, {this.props.result.location.city}, {this.props.result.location.provState}, {this.props.result.location.country}
                              </h2>
                            }
                            {this.props.result.location !== undefined && this.props.result.location.name && this.props.result.location.city && !this.props.result.location.provState && this.props.result.location.country &&
                              <h2 className="mobileLocation eventElementTop">
                                {this.props.result.location.name}, {this.props.result.location.city}, {this.props.result.location.country}
                              </h2>
                            }
                            {this.props.result.location === undefined &&
                              <h2 className="mobileLocation eventElementTop">
                                NO LOCATION
                              </h2>
                            }
                            <div className="verticalAlign" style={{}}>
                                <h1 className="eventTitle">
                                    {(this.props.result.event === this.props.result.otherName || this.props.result.otherName === undefined) &&
                                        <div>{this.props.result.name}</div>
                                    }
                                    {(this.props.result.event !== this.props.result.otherName && this.props.result.otherName !== undefined) &&
                                        <div>{this.props.result.otherName}</div>
                                    }
                                </h1>
                            </div>
                            <div style={{position:'absolute',bottom:5+'%',left: 0,right: 0,marginLeft: 'auto',marginRight: 'auto'}}>{this.props.result.title}</div>
                        </div>
                    }

                    {this.props.result.location !== undefined &&
                        <div className="column height">
                            <div className="verticalAlign textRotate inner">
                                {this.state.timeObject}
                            </div>
                            <div className={`flag-icon-background flag-icon-${this.props.result.location.co}`} style={{ zIndex:-1,opacity:0.4,backgroundSize:'cover',fontSize:1.7+'em',fontWeight:600,position:'absolute',right:0,top:0,width:100+'%',height:100+'%' }}>

                            </div>
                        </div>
                    }
                    {this.props.result.location === undefined &&
                        <div className="column height clockDiv" style={{ fontSize:1.7+'em',textAlign:'center' }}>
                            PlaceHolder
                        </div>
                    }

                </div>


                {this.state.hidden === false &&
                    <FightList fights={this.props.result.fightCard} />
                }


            </div>
        )
    }
}


export default Event;
