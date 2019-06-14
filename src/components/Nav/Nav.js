import React, {Component} from 'react'
import './Nav.css';
import PropTypes from 'prop-types'
import LionessContext from '../../LionessContext/LionessContext';
import ds from '../../STORE/dataservice'
import {Link} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EstimatesPage from '../Projects/EstimatesPage'
import "react-tabs/style/react-tabs.css";
const {deleteStoredLoginInfo} = ds

export default class Navbar extends Component{
    static propTypes= {
        history: PropTypes.object.isRequired,
    }
    static contextType= LionessContext
    constructor(){
        super()
    }
    logoutClick=()=>{
        deleteStoredLoginInfo()
        this.props.history.push('/login')
    }
    render(){
       
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
    <EstimatesPage/>
</TabPanel>
        </Tabs>

        <button onClick={()=>this.logoutClick()}>
            Log Out
        </button>
        </nav>
       
    )
}
}