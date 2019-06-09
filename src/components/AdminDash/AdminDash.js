import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EstimatesPage from '../Projects/EstimatesPage'
import ClientPage from '../Client/ClientPage'
import ActiveProjectsPage from '../Projects/ActiveProjectsPage'
import BilledProjectsPage from '../Projects/BilledProjectsPage'
import ProjectManagerPage from '../ProjectManagers/ProjectManagerPage'
import HomePage from '../Home/HomePage'
import {Link, Route, Switch} from 'react-router-dom'
import DataLoader from '../DataLoader/DataLoader'
import ds from '../../STORE/dataservice';
import './AdminDash.css'
import LionessContext from '../../LionessContext/LionessContext'

import "react-tabs/style/react-tabs.css";
const {deleteCookieLoginInfo} = ds
const {getUsers, getProjects, handleFetchError }  =ds
export default class AdminDash extends Component{
static contextType= LionessContext;
constructor(){
    super()
}
logoutClick=()=>{
    deleteCookieLoginInfo()
    this.props.history.push('/login')
}
    render(){  
        const {path}=this.props.match   
        return(
            <div>
            <nav role='navigation' className="navBar">
            <h3>Lioness</h3>
         <h4>Welcome!</h4>
         <button onClick={()=>this.logoutClick()}>
            Log Out
        </button>
                <div className='links'>
                    <Link to={path}className='link'>Home</Link>
                    <Link to={`${path}/clients`}className='link'>Clients</Link>
                    <Link to={`${path}/estimates`}className='link'>Estimates</Link>
                    <Link to={`${path}/active-projects`}className='link'>Active Projects</Link>
                    <Link to={`${path}/billed-projects`}className='link'>Billed Projects</Link>
                    <Link to={`${path}/project-managers`}className='link'>Project Managers</Link>
                </div>
         <div className='tabs'>
             <Switch>
             <Route path={`${path}`} exact component={HomePage}></Route>
             <Route path={`${path}/clients`} exact component={ClientPage}></Route>
             <Route path={`${path}/estimates`} exact component={EstimatesPage}></Route>
             <Route path={`${path}/active-projects`} exact component={ActiveProjectsPage}></Route>
             <Route path={`${path}/billed-projects`} exact component={BilledProjectsPage}></Route>
             <Route path={`${path}/project-managers`} exact component={ProjectManagerPage}></Route>
             </Switch>
         </div>
        </nav>
            </div>
        )
    }
}