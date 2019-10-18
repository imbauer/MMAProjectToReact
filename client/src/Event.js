import React, { Component } from "react";


class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeObject: props.result.when.monthString
        };
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.result.when.monthString !== newProps.result.when.monthString) {
            this.setState({ timeObject: newProps.result.when.monthString })
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
                            {this.props.result.when.monthString.substring(0,3)} {this.props.result.when.weekDay.substring(0,3)} {this.props.result.when.day} {this.props.result.when.year} {this.props.result.when.hour}:{this.props.result.when.minute}:00 {this.props.result.when.offset}
                            {this.state.timeObject}
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
