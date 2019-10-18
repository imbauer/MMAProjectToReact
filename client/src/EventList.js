import React, { Component } from "react";
import Event from './Event';

function EventList(props) {
    let counter = 0;
    let events = props.events.map((event) => {
        return <Event result={event} />
    })
    return (
        <div>
            {events}
        </div>
    )
}

export default EventList;
