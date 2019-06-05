import React, {Component} from 'react'
import DataLoader from '../DataLoader/DataLoader'
import ds from '../../STORE/dataservice';
import LionessContext from '../../LionessContext/LionessContext'
const {getUsers, getProjects, handleFetchError }  =ds

export default class HomePage extends Component{
    render(){
        return(
            <div>
            <DataLoader 
            onReject = {handleFetchError}
            promise={getProjects()} 
            onDataLoaded={this.context.setProjects}/>
            <DataLoader 
            promise={getUsers()} 
            onReject = {handleFetchError}
            onDataLoaded={this.context.setUsers}/>
            <h2>Hi!</h2>
            </div>
        )
    }
}