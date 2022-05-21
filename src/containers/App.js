
import CardList from '../component/CardList'
// import { robots } from './robot'
import SearchBox from '../component/SearchBox'
import React, { Component } from "react";
import './App.css';
import Scroll from "../component/Scroll";

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        }).then(users => {
            this.setState({ robots: users })
        })

        console.log('componentDidMount check')
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })

    }
    render() {
        const { robots,searchField} = this.state
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        console.log(filteredRobots)
        if (!robots.length) {
            return <h1>Loading</h1>
        }
        return (
            <div className="tc">
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>

        );
    }


}

export default App;