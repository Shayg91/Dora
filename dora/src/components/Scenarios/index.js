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
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
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
      createNew: false,
      edit: false,
      errorOpen: false
    };

    this.handleScenarioSelected = this.handleScenarioSelected.bind(this);
    this.handleScenarioDelete = this.handleScenarioDelete.bind(this);
    this.handleNewScenario = this.handleNewScenario.bind(this);
    this.handleAddScenario = this.handleAddScenario.bind(this);
    this.handleScenarioEdit = this.handleScenarioEdit.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleErrorOpen = this.handleErrorOpen.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
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

  handleErrorOpen = () => {
    this.setState({ errorOpen: true });
  };

  handleErrorClose = () => {
    this.setState({ errorOpen: false });
  };

  handleScenarioSelected = scenario => {
    console.log(scenario);
    this.setState(state => ({
      selectedScenario: scenario
    }));
  };

  handleScenarioEdit = () => {
    this.setState(state => ({
      createNew: false,
      edit: true
    }));
  };

  handleNewScenario = () => {
    this.setState(state => ({
      createNew: true,
      selectedLesson: undefined,
      edit: false
    }));
  };

  handleCloseDialog = (key, value) => {
    this.handleAddScenario(key, value);
    this.setState(state => ({
      createNew: false,
      edit: false
    }));
  };

  handleAddScenario = (key, value) => {
    console.log("Got Here");

    // Check if the id was already added to the list of scenarios
    let isNew = true,
      location = -1,
      index = 0;

    while (isNew && index < this.state.scenarios.length) {
      if (this.state.scenarios[index].key === key) {
        isNew = false;
        location = index;
      }
      index++;
    }

    if (isNew) {
      this.setState(state => ({
        scenarios: [...state.scenarios, { key: key, value: value }]
      }));
    } else {
      let updatedScenarios = this.state.scenarios;
      updatedScenarios[location].value = value;

      this.setState(state => ({ scenarios: updatedScenarios }));
    }
  };

  handleScenarioDelete = () => {
    this.props.firebase
      .canRemoveScenario(this.state.selectedScenario.value.name)
      .then(returnValue => {
        if (!returnValue) {
          this.handleErrorOpen();
        } else {
          this.props.firebase
            .removeScenario(this.state.selectedScenario.key)
            .then(() => {
              let scenarios = this.state.scenarios;
              let palcement = 0;

              while (palcement !== scenarios.length) {
                if (
                  scenarios[palcement].key === this.state.selectedScenario.key
                ) {
                  break;
                } else {
                  palcement++;
                }
              }

              scenarios.splice(palcement, 1);
              this.setState(state => ({
                selectedScenario: undefined,
                scenarios: scenarios
              }));
            });
        }
      });
  };

  render() {
    const {
      scenarios,
      loading,
      selectedScenario,
      createNew,
      edit,
      errorOpen
    } = this.state;
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
            deleteScenario={this.handleScenarioDelete}
            editScenario={this.handleScenarioEdit}
            newScenario={this.handleNewScenario}
            addScenario={this.handleAddScenario}
            createNew={createNew}
            edit={edit}
            close={this.handleCloseDialog}
            errorOpen={errorOpen}
            closeError={this.handleErrorClose}
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
  deleteScenario,
  editScenario,
  newScenario,
  addScenario,
  createNew,
  edit,
  close,
  errorOpen,
  closeError
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
        {selectedScenario !== undefined && !createNew && !edit ? (
          <Scenario
            scenario={selectedScenario}
            deleteScenario={deleteScenario}
            editScenario={editScenario}
          />
        ) : createNew || edit ? (
          <NewScenario
            addNewScenario={addScenario}
            edit={edit}
            data={selectedScenario}
            closeScenario={close}
          />
        ) : (
          <Typography>No Scenario Selected</Typography>
        )}
        {!createNew && !edit && (
          <Fab
            color="secondary"
            aria-label="Edit"
            className={classes.fab}
            onClick={newScenario}
          >
            <AddIcon />
          </Fab>
        )}
        <Dialog
          open={errorOpen}
          onClose={closeError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Can't Delete Scenario"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Can not Delete Scenario since it is connected to other elements.
              Please Remove all connections, then Delete.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeError} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default withFirebase(SceanriosPage);
