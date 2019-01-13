import React, { Component } from 'react';

class GoalsList extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        const goals = this.props.goals;
        const listItems = goals.map((goal) =>
            <li key={goal.toString()}>
                {goal}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }
}

export default GoalsList;