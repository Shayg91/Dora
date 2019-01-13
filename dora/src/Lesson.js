import React, { Component } from 'react';
import './Lesson.css'
import firebase from './scripts/Dora';
import GoalsList from './partials/GoalsList'

class Lesson extends Component{
    constructor(props) {
        super(props);

        this.state ={
          title:'',
          goals:[],
          badge:''
        };

        this.ref = firebase.firestore().collection('lesson');

        this.singleLesson = this.ref.doc('U9c0DAnBIl6JznrAjkfa')
            .get()
            .then((doc)=> this.setState({goals: doc.data().goals}));
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addLesson = e => {
        e.preventDefault();
        this.ref.add({
            title: this.state.title,
            badge: this.state.badge
        });
        this.setState({
           title: '',
           badge:''
        });
    };

    render(){
        return(<div>
                <GoalsList goals={this.state.goals}/>
            </div>
            /*<form onSubmit={this.addLesson}>
                <input type="text" name="title" placeholder="Lesson Title"
                       value={this.state.title} onChange={this.updateInput}/>
                <input type="text" name="badge" placeholder="Badge"
                       value={this.state.badge} onChange={this.updateInput}/>
                <FlatList data={this.state.goals} renderItem={({item}) => <Text>{item}</Text>}/>
                <button type="submit">Submit</button>
            </form>*/
        );
    }
}

export default Lesson;