import React, { Component } from "react";
import EventList from './EventList';
import EventFilter from './EventFilter';
import { NavBar, About } from './components'
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.stateChange = this.stateChange.bind(this);
        // this.callDB2 = this.callDB2.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.callDBUpcoming = this.callDBUpcoming.bind(this);
        this.callDBPast = this.callDBPast.bind(this);
        this.state = {
            ufc: true,
            bellator: false,
            radio1: "upcoming",
            apiResponse: "",
            dbResponse: [{name:"Max",title:"Kraynov", when: {monthString:'January',weekDay:'',day:'',year:'',hour:'',minute:'',offset:''}},{name:"Jerome",title:"Blume", when: {monthString:'January',weekDay:'',day:'',year:'',hour:'',minute:'',offset:''}}]
        };
    }

    callAPI() {
        fetch("http://192.168.99.100:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    stateChange() {
        this.setState({ dbResponse: [{name:'HEY', title:'YOU'}] })
    }

    // callDB() {
    //     fetch("http://192.168.99.100:9000/testDB")
    //         .then(res => res.json())
    //         .then(res => this.setState({ dbResponse: res.express }))
    //         .catch(err => err);
    // }

    // callDB2() {
    //     fetch("http://192.168.99.100:9000/testDB/twoResults")
    //         .then(res => res.json())
    //         .then(res => this.setState({ dbResponse: res.express }))
    //         .catch(err => err);
    // }
    callDBUpcoming() {
        fetch("http://192.168.99.100:9000/promotions/upcoming")
            .then(res => res.json())
            .then(res => this.setState({ dbResponse: res.results }))
            .catch(err => err);
    }
    callDBPast() {
        fetch("http://192.168.99.100:9000/promotions/past")
            .then(res => res.json())
            .then(res => this.setState({ dbResponse: res.results }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
        // this.callDB();
    }
    onCheckChange(e) {
        console.log(e.target.checked, e.target.name);
        this.setState({
            [e.target.name]: e.target.checked
        },
        function() {
            console.log('radio1 ' + this.state.radio1);
            console.log('ufc ' + this.state.ufc);
            console.log('bellator ' + this.state.bellator);
            if (this.state.ufc === true && this.state.bellator === true) {
                this.callDBUpcoming();
            }
            else {
                this.callDBPast();
            }
        });
    }

    onRadioChange(e) {
        console.log(e.target.checked, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        },
        function() {
            console.log('radio1 ' + this.state.radio1);
            console.log('ufc ' + this.state.ufc);
            console.log('bellator ' + this.state.bellator);
            if (this.state.ufc === true && this.state.bellator === true) {
                this.callDBUpcoming();
            }
            else {
                this.callDBPast();
            }
        });
    }



    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <About />
                <NavBar/>
                <div>
                  <input type="checkbox" name="ufc" checked={this.state.ufc} onChange={this.onCheckChange} /><label>UFC</label>
                  <input type="checkbox" name="bellator" checked={this.state.bellator} onChange={this.onCheckChange} /><label>Bellator</label>
                  <input type="radio" name="radio1" value="upcoming" checked={this.state.radio1 === "upcoming"} onChange={this.onRadioChange} /> UPCOMING <br />
                  <input type="radio" name="radio1" value="past" checked={this.state.radio1 === "past"} onChange={this.onRadioChange} /> PAST <br />
                  <br />
                  UFC: {this.state.ufc.toString()} <br />
                  Bellator: {this.state.bellator.toString()} <br />
                  Radio: {this.state.radio1} <br />
                </div>

                hello7771
                <p className="App-intro">{this.state.apiResponse}</p>
                <EventFilter />
                <EventList events={this.state.dbResponse}/>
            </div>
        );
    }
}

export default App;
