import React, {Component} from 'react';
import NavBar from '../Nav/Nav';
import Project from './Project'
import ProjectSearchBar from './ProjectSearchBar'
import ds from '../../STORE/dataservice';
import DataLoader from '../DataLoader/DataLoader'
import LionessContext from '../../LionessContext/LionessContext'
const {getUsers, getProjects, handleFetchError }  =ds
export default class EstimatesPage extends Component{
    static contextType= LionessContext;
    render(){
        const opts= {statusFilter: 'estimate',
    
        }
        return(
            <div className='tab-page'>
                <DataLoader 
                onReject = {handleFetchError}
                promise={getProjects(opts)} 
                onDataLoaded={this.context.setProjects}/>
                <DataLoader 
                promise={getUsers()} 
                onReject = {handleFetchError}
                onDataLoaded={this.context.setUsers}/>
                <h2>Estimates</h2>
                <ProjectSearchBar status={opts.statusFilter}/>
                <Project />
            </div>
        )
    }
}