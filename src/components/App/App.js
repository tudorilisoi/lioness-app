import React, { Component } from "react";
import ds from "../../STORE/dataservice";
import config from "../../config";
import { Route, withRouter } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import LoginForm from "../LoginForm/LoginForm";
import AdminDash from '../AdminDash/AdminDash'
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import ClientPage from '../Client/ClientPage.js'
import LionessContext from "../../LionessContext/LionessContext";
import ActiveProjectsPage from '../Projects/ActiveProjectsPage';
import ProjectManagerPage from '../ProjectManagers/ProjectManagerPage';
import EstimatesPage from '../Projects/EstimatesPage';
import BilledProjectsPage from '../Projects/BilledProjectsPage';
import AddClientForm from '../Client/AddClientForm'
import './App.css'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      currentUser:null,   
      error: null,
      usersLoaded: false,
      projectsLoaded: false,
      currentUserLoaded: false,
    };
  }
  beforeProjectFetch =()=>{
this.setState({projectsLoaded: false})
  }
  beforeUserFetch=()=>{
    this.setState({usersLoaded: false,})
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
  setCurrentUser = currentUser =>{
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
      projectsLoaded: this.state.projectsLoaded,
      usersLoaded: this.state.usersLoaded,
      currentUser:this.state.currentUser,
      history: this.props.history,
      setCurrentUser: this.setCurrentUser,
      setUsers: this.setUsers,
      setProjects:this.setProjects,
      beforeProjectFetch: this.beforeProjectFetch,
      beforeUserFetch: this.beforeUserFetch,
      setViewProjectStatus: this.setViewProjectStatus,
    };
    return (
      <div className="App">    
        <LionessContext.Provider value={contextValue}>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path='/admin-dash' component={AdminDash}/>
          <Route exact path='/project-managers' component={ProjectManagerPage}/>
          <Route exact path='/clients' component={ClientPage}/>
          <Route exact path='/estimates' component={EstimatesPage}/>
          <Route exact path='/active-projects' component={ActiveProjectsPage}/>
          <Route exact path='/billed-projects' component={BilledProjectsPage}/>
          <Route exact path='/add-client-form' component={AddClientForm}/>
        </LionessContext.Provider>
      </div>
    );
  }
}
export default App;
