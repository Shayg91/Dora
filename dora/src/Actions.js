import React, { Component } from 'react';
import firebase from './scripts/Dora';
import Grid from '@material-ui/core/Grid'

import Action from './partials/Action';


/*class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    render() {
      return (
        <div>
          <h3>TODO</h3>
          <TodoList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="new-todo">
              What needs to be done?
            </label>
            <input
              id="new-todo"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <button>
              Add #{this.state.items.length + 1}
            </button>
          </form>
        </div>
      );
    }
  
    handleChange(e) {
      this.setState({ text: e.target.value });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.text.length) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    }
}*/

class Actions extends Component{
    constructor(props) {
        super(props);

        this.actions = [];
        this.ref = firebase.firestore().collection('action');

        this.ref.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                this.actions = [...this.actions,doc];
                console.log(doc.id, " => ", doc.data());
            });
        });
    }

    render(){
        return(
            <div>
                <h3>Actions</h3>
                <Grid container direction='column' justify='space-around' alignItems='stretch'>
                    <Action data={this.actions}/>
                </Grid>
            </div>
        );
    }
}

export default Actions;