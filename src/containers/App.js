
import CardList from '../component/CardList'
// import { robots } from './robot'
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';
import SearchBox from '../component/SearchBox'
import React, { Component } from "react";
import './App.css';
import Scroll from "../component/Scroll";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchTpProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots : () => dispatch(requestRobots())
    }
}
class App extends Component {

    componentDidMount() {
       this.props.onRequestRobots();
    }

    // onSearchChange = (event) => {
    //     this.setState({ searchField: event.target.value })

    // }
    render() {
        // const { robots } = this.state
        const { searchField, onSearchChange,robots,isPending } = this.props
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        if (isPending) {
            return <h1>Loading</h1>
        }
        return (
            <div className="tc">
                <h1>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>

        );
    }


}

export default connect(mapStateToProps, mapDispatchTpProps)(App);