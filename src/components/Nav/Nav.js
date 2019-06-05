import React, {Component} from 'react'
import './Nav.css';
import PropTypes from 'prop-types'
import LionessContext from '../../LionessContext/LionessContext';
import ds from '../../STORE/dataservice'
import {Link} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EstimatesPage from '../Projects/EstimatesPage'
import "react-tabs/style/react-tabs.css";
const {deleteCookieLoginInfo} = ds

export default class Navbar extends Component{
    static propTypes= {
        history: PropTypes.object.isRequired,
    }
    static contextType= LionessContext
    constructor(){
        super()
    }
    logoutClick=()=>{
        deleteCookieLoginInfo()
        this.props.history.push('/login')
    }
    render(){
        console.log(`navbar`, this.context)
    return(
       
        <nav role='navigation' className="navBar">
        <h3>Lioness</h3>
        <h4>Welcome!</h4>
        <Tabs>
            <TabList>
        <Tab>Home</Tab>
        <Tab>Clients</Tab>
        <Tab>Estimates</Tab>
        <Tab>Active Projects</Tab>
        <Tab>Billed Projects</Tab>
        <Tab>Project Managers</Tab>
        </TabList>
<TabPanel>
    
</TabPanel>
        </Tabs>



        <Link to='/admin-dash'><h2>Home</h2></Link>
        <Link to='/clients'>
               <h2>Clients</h2>
               </Link>
               <Link to='/estimates'>
                   <h2>Estimates</h2>
               </Link>
               <Link to='/active-projects'>
                   <h2>Active Projects</h2>
               </Link>
               <Link to='/billed-projects'>
                   <h2>Billed Projects</h2>
               </Link>
               <Link to='/project-managers'>
                   <h2>Project Managers</h2>
               </Link>
        <button onClick={()=>this.logoutClick()}>
            Log Out
        </button>
        </nav>
       
    )
}
}