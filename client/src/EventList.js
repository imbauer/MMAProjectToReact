import React, { Component } from "react";
import Event from './Event';

function EventList(props) {
    let events = props.events.map((event) => {
        return <Event result={event} selectValue={props.selectValue} />
    })
    return (
        <div>
            {events}
        </div>
    )
}

export default EventList;
