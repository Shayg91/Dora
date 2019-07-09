import React, { Component } from "react";

import { withFirebase } from "../Firebase";
import Scenario from "../Scenario";
import NewScenario from "../NewScenario";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Fab
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ChildCareIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    color: theme.color
  },
  toolbar: theme.mixins.toolbar,
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

class SceanriosPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      scenarios: [],
      selectedScenario: undefined,
      createNew: false
    };

    this.handleScenarioSelected = this.handleScenarioSelected.bind(this);
    this.handleNewScenario = this.handleNewScenario.bind(this);
    this.handleAddScenario = this.handleAddScenario.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.scenarios().then(allScenarios => {
      this.setState({
        scenarios: allScenarios,
        loading: false,
        selectedScenario: undefined
      });
    });
  }

  handleScenarioSelected = scenario => {
    console.log(scenario);
    this.setState(state => ({
      selectedScenario: scenario
    }));
  };

  handleNewScenario = () => {
    this.setState(state => ({
      createNew: true,
      selectedScenario: undefined
    }));
  };

  handleAddScenario = (key, value) => {
    console.log("Got Here");
    this.setState(state => ({
      scenarios: [...state.scenarios, { key: key, value: value }],
      createNew: false,
      selectedScenario: undefined
    }));
  };

  render() {
    const { scenarios, loading, selectedScenario, createNew } = this.state;
    return (
      <div>
        {console.log(selectedScenario)}
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <ScenariosList
            scenarios={scenarios}
            selectScenario={this.handleScenarioSelected}
            selectedScenario={selectedScenario}
            newScenario={this.handleNewScenario}
            addScenario={this.handleAddScenario}
            createNew={createNew}
          />
        )}
      </div>
    );
  }
}

const ScenariosList = ({
  scenarios,
  selectScenario,
  selectedScenario,
  newScenario,
  addScenario,
  createNew
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {scenarios.map(scenario => (
            <ListItem
              button
              onClick={event => selectScenario(scenario)}
              key={scenario.key}
            >
              <ListItemIcon>
                <ChildCareIcon />
              </ListItemIcon>
              <ListItemText primary={scenario.value.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        {selectedScenario !== undefined ? (
          <Scenario scenario={selectedScenario} />
        ) : createNew ? (
          <NewScenario addNewScenario={addScenario} />
        ) : (
          <Typography>No Scenario Selected</Typography>
        )}
        {!createNew && (
          <Fab
            color="secondary"
            aria-label="Edit"
            className={classes.fab}
            onClick={newScenario}
          >
            <AddIcon />
          </Fab>
        )}
      </main>
    </div>
  );
};

export default withFirebase(SceanriosPage);
