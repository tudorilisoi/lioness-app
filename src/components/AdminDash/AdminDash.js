import React, {Component} from 'react'
import Navbar from '../Nav/Nav'
import LionessContext from '../../LionessContext/LionessContext'
import ds from '../../STORE/dataservice';
import {Link} from 'react-router-dom'
import DataLoader from '../DataLoader/DataLoader'
const {getUsers, getProjects }  =ds
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
                promise={getProjects()} onDataLoaded={this.context.setProjects}/>
                <DataLoader 
                promise={getUsers()} onDataLoaded={this.context.setUsers}/>
                <Link to='/clients'>
               <h2>Clients</h2>
               </Link>
               <Link to='/projects'>
                   <h2>Projects</h2>
               </Link>
            </div>
        )
    }
}