import React, { Component } from "react";
import ds from "../../STORE/dataservice";
import config from "../../config";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import LoginForm from "../LoginForm/LoginForm";
import AdminDash from '../AdminDash/AdminDash'
import LionessContext from "../../LionessContext/LionessContext";

import './App.css'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: ds.defaultProjectData,
      roles: [],
      statuses: [],
      currentUser: null,
      error: null,
      rolesLoaded: false,
      statusesLoaded: false,
      usersLoaded: false,
      projectsLoaded: false,
      currentUserLoaded: false,
    };
  }
  beforeProjectFetch = () => {
    this.setState({ projectsLoaded: false })
  }
  beforeUserFetch = () => {
    this.setState({ usersLoaded: false, })
  }
  setProjects = projects => {
    if (ds.areObjectsDeepEqual(projects, this.state.projects)) {
      return
    }
    this.setState({
      projectsLoaded: true,
      projects
    });
  };
  setUsers = users => {
    if (ds.areObjectsDeepEqual(users, this.state.users)) {
      console.log('setUsers(): SKIP')
      return
    }
    this.setState({
      usersLoaded: true,
      users
    });
  };
  setRoles = roles => {
    if (ds.areObjectsDeepEqual(roles, this.state.roles)) {
      return
    }

    this.setState({
      rolesLoaded: true,
      roles
    })
  }
  setStatuses = statuses => {
    if (ds.areObjectsDeepEqual(statuses, this.state.statuses)) {
      return
    }

    this.setState({
      statusesLoaded: true,
      statuses
    })
  }
  setCurrentUser = currentUser => {
    this.setState({
      currentUserLoaded: true,
      currentUser
    })
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <h1>There is an error:{error.toString()}</h1>;
    }
    const contextValue = {
      projects: this.state.projects,
      users: this.state.users,
      roles: this.state.roles,
      statuses: this.state.statuses,
      rolesLoaded: this.state.rolesLoaded,
      statusesLoaded: this.state.statusesLoaded,
      projectsLoaded: this.state.projectsLoaded,
      usersLoaded: this.state.usersLoaded,
      currentUser: this.state.currentUser,
      history: this.props.history,
      setCurrentUser: this.setCurrentUser,
      setRoles: this.setRoles,
      setStatuses: this.setStatuses,
      setUsers: this.setUsers,
      setProjects: this.setProjects,
      beforeProjectFetch: this.beforeProjectFetch,
      beforeUserFetch: this.beforeUserFetch,
      setViewProjectStatus: this.setViewProjectStatus,
    };
    return (
      <div className="App">
        <LionessContext.Provider value={contextValue}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LoginForm} />
              <Route path='/admin-dash'
                component={AdminDash} />
            </Switch>
          </BrowserRouter>
        </LionessContext.Provider>
      </div>
    );
  }
}
export default App;
