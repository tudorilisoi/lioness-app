import React, { Component } from "react";
import Header from "../Header/Header";
import DataLoader from "../DataLoader/DataLoader";
import config from "../../config";
import { Route, withRouter } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import LoginForm from "../LoginForm/LoginForm";
import AdminDash from '../AdminDash/AdminDash'
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import LionessContext from "../../LionessContext/LionessContext";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      currentUser:null,
      error: null,
      usersLoaded: false,
      projectsLoaded: false
    };
  }
  setProjects = projects => {
    this.setState({
      projectsLoaded: true,
      projects
    });
  };
  setUsers = users => {
    this.setState({
      usersLoaded: true,
      users
    });
  };
  render() {
    const { error } = this.state;
    if (error) {
      return <h1>There is an error:{error.toString()}</h1>;
    }
    const contextValue = {
      projects: this.state.projects,
      users: this.state.users,
      projectsLoaded: this.state.projectsLoaded,
      usersLoaded: this.state.usersLoaded,
      currentUser:this.state.currentUser,
      history: this.props.history,
    };
    return (
      <div className="App">
        <Header />
        <ErrorBoundary>
          <DataLoader
            url={config.TEST_PROJECTS}
            onBeforeFetch={() => this.setState({ projectsLoaded: false })}
            onDataLoaded={this.setProjects}
          />
          <DataLoader
            url={config.TEST_USERS}
            onBeforeFetch={() => this.setState({ usersLoaded: false })}
            onDataLoaded={this.setUsers}
          />
        </ErrorBoundary>
        <LionessContext.Provider value={contextValue}>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path='/admin-dash' component={AdminDash}/>
        </LionessContext.Provider>
      </div>
    );
  }
}
export default App;
