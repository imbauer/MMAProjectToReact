import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
    render() {
        return (
            <ul className="NavList">
                <li>
                    HOME
                </li>
                <li>
                    ABOUT
                </li>
                <li>
                    CONTACTS
                </li>
            </ul>
        );
    }
}

export default NavBar;
