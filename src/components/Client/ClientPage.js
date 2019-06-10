import React, {Component} from 'react';
import DataLoader from '../DataLoader/DataLoader'
import LionessContext from '../../LionessContext/LionessContext'
import ds from '../../STORE/dataservice';
import Client from '../Client/Client'
import Navbar from '../Nav/Nav'
import {Link} from 'react-router-dom'
import UserSearchBar from '../UserSearchBar/UserSearchBar'
const {getUsers, getProjects, handleFetchError }  =ds
export default class ClientPage extends Component{

static contextType= LionessContext;
    render(){
        const opts= {roleFilter: 2}
        return(
            <div className='tab-page'>
                <DataLoader 
                onReject = {handleFetchError}
                promise={getProjects()} 
                onDataLoaded={this.context.setProjects}/>
                <DataLoader 
                promise={getUsers(opts)} 
                onReject = {handleFetchError}
                onDataLoaded={this.context.setUsers}/>
                <h2>Clients</h2>
                <UserSearchBar/>
                <Link to='/add-client-form'>
                <button>Add Client</button>
                </Link>
                <button>Email Client</button>
                
                 <Client />
            </div>
        )
    }
}