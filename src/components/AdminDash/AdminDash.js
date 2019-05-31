import React, {Component} from 'react'
import Navbar from '../Nav/Nav'
import {Link} from 'react-router-dom'
import DataLoader from '../DataLoader/DataLoader'
import ds from '../../STORE/dataservice';
import LionessContext from '../../LionessContext/LionessContext'
const {getUsers, getProjects, handleFetchError }  =ds
export default class AdminDash extends Component{
static contextType= LionessContext;
componentDidMount(){

}
    render(){ 
        console.log(this.context)       
        return(
            <div>
                <Navbar/>
                <DataLoader 
                onReject = {handleFetchError}
                promise={getProjects()} 
                onDataLoaded={this.context.setProjects}/>
                <DataLoader 
                promise={getUsers()} 
                onReject = {handleFetchError}
                onDataLoaded={this.context.setUsers}/>
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
              
            </div>
        )
    }
}