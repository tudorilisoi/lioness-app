import React, {Component} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EstimatesPage from '../Projects/EstimatesPage'
import ClientPage from '../Client/ClientPage'
import ActiveProjectsPage from '../Projects/ActiveProjectsPage'
import BilledProjectsPage from '../Projects/BilledProjectsPage'
import ProjectManagerPage from '../ProjectManagers/ProjectManagerPage'
import HomePage from '../Home/HomePage'
import {Link} from 'react-router-dom'
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
        return(
            <div>
                
        
        <Tabs>
            <nav role='navigation' className="navBar">
            <h3>Lioness</h3>
         <h4>Welcome!</h4>
            {/* <TabList>
        <Tab>Home</Tab>
        <Tab>Clients</Tab>
        <Tab>Estimates</Tab>
        <Tab>Active Projects</Tab>
        <Tab>Billed Projects</Tab>
        <Tab>Project Managers</Tab>
        <Tab onSelect={(e)=>this.deleteCookieLoginInfo(e)}>Logout</Tab>
        </TabList> */}
        </nav>
        <TabPanel>
       <HomePage/>
        </TabPanel>
        <TabPanel>
            <ClientPage/>
        </TabPanel>
<TabPanel>
    <EstimatesPage/>
</TabPanel>
<TabPanel>
    <ActiveProjectsPage/>
</TabPanel>
<TabPanel>
    <BilledProjectsPage/>
</TabPanel>
<TabPanel>
    <ProjectManagerPage/>
    </TabPanel>
    <TabPanel>
    <button onClick={()=>this.logoutClick()}>
            Log Out
        </button>
    </TabPanel>

        </Tabs>
       
        
          
            </div>
        )
    }
}