import React, {Component} from 'react'
import { NavTab} from "react-router-tabs";
import EstimatesPage from '../Projects/EstimatesPage'
import ClientPage from '../Client/ClientPage'
import ActiveProjectsPage from '../Projects/ActiveProjectsPage'
import BilledProjectsPage from '../Projects/BilledProjectsPage'
import ProjectManagerPage from '../ProjectManagers/ProjectManagerPage'
import ContractorsPage from '../Contractors/ContractorsPage'
import HomePage from '../Home/HomePage'
import { Route, Switch, Redirect} from 'react-router-dom'
import ds from '../../STORE/dataservice';
import './AdminDash.css'
import LionessContext from '../../LionessContext/LionessContext'

import "react-tabs/style/react-tabs.css";
const {deleteCookieLoginInfo} = ds
export default class AdminDash extends Component{
static contextType= LionessContext
logoutClick=()=>{
    deleteCookieLoginInfo()
    this.props.history.push('/login')
}
    render(){  
        const {path}=this.props.match   
        return(
            <div>
            <nav role='navigation' className="navBar">
                <div className='heading'>
            <h3>Lioness</h3>
         <h4>Welcome!</h4>
         <button onClick={()=>this.logoutClick()}>
            Log Out
        </button>
        </div>
                <div className='links'>
                
                    <NavTab to={`${path}/home`}className='link'>Home</NavTab>
                    <NavTab to={`${path}/estimates`}className='link'>Estimates</NavTab>
                    <NavTab to={`${path}/active-projects`}className='link'>Active Projects</NavTab>
                <NavTab to={`${path}/billed-projects`}className='link'>Billed Projects</NavTab>
                <NavTab to={`${path}/clients`}className='link'>Clients</NavTab>
                    <NavTab to={`${path}/project-managers`}className='link'>Project Managers</NavTab>
                    <NavTab to={`${path}/contractors`}className='link'>Contractors</NavTab>
                </div>
         <div className='tabs'>
             <Switch>
             <Route
          exact
          path={`${path}`}
          render={() => <Redirect replace to={`${path}/home`} />}
        />
             <Route path={`${path}/home`} exact component={HomePage}></Route>
             <Route path={`${path}/clients`}  exact component={ClientPage}></Route>
             <Route path={`${path}/estimates`}  exact component={EstimatesPage}></Route>
             <Route path={`${path}/active-projects`}  exact component={ActiveProjectsPage}></Route>
             <Route path={`${path}/billed-projects`}  exact component={BilledProjectsPage}></Route>
             <Route path={`${path}/project-managers`}  exact component={ProjectManagerPage}></Route>
             <Route path={`${path}/contractors`}  exact component={ContractorsPage}></Route>
             </Switch>
             
         </div>
        </nav>
            </div>
        )
    }
}