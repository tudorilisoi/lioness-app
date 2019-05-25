import React, { Component } from "react";
import Header from "../Header/Header";
import DataLoader from "../DataLoader/DataLoader";
import config from "../../config";
import { Route, withRouter } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import LoginForm from '../LoginForm/LoginForm'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
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
    return (
      <div className="App">
        <Header />
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

        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginForm} />
      </div>
    );
  }
}
export default App;
