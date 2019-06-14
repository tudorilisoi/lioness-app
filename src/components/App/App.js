import React, { Component } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'

// need to explicitly import all needed icons 
// NOTE copy-paste this line to library.add
import {
  faTrash, faEdit, faPlus, faMinus, faSave, faTimes
} from '@fortawesome/free-solid-svg-icons'

import ds from "../../STORE/dataservice";
import config from "../../config";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import LoginForm from "../LoginForm/LoginForm";
import AdminDash from '../AdminDash/AdminDash'
import LionessContext from "../../LionessContext/LionessContext";
import './App.css'

library.add(
  faTrash, faEdit, faPlus, faMinus, faSave, faTimes
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    ds.getCookieLoginInfo()
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ds.defaultUserData,
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
      reloadProjects: null,
    };
  }
  beforeProjectFetch = () => {
    this.setState({ projectsLoaded: false })
  }
  beforeUserFetch = () => {
    this.setState({ usersLoaded: false, })
  }
  setProjects = (projects, reloadFn) => {
    if (ds.areObjectsDeepEqual(projects, this.state.projects)) {
      console.log('Projects are up to date')
      return
    }
    this.setState({
      reloadProjects: reloadFn,
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
    console.log('setCurrentUser:', currentUser)
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
      reloadProjects: this.state.reloadProjects,
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
              <Route exact path="/login" component={LoginForm} />
              <PrivateRoute exact path="/" component={LandingPage} />
              <PrivateRoute path='/admin-dash'
                component={AdminDash} />
            </Switch>
          </BrowserRouter>
        </LionessContext.Provider>
      </div>
    );
  }
}
export default App;
