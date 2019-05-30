import React, {Component} from 'react';
import NavBar from '../Nav/Nav';
import Project from '../Projects/Project'
import ProjectSearchBar from './ProjectSearchBar'
import ds from '../../STORE/dataservice';
import DataLoader from '../DataLoader/DataLoader'
import LionessContext from '../../LionessContext/LionessContext'
const {getUsers, getProjects, handleFetchError }  =ds
export default class ProjectPage extends Component{
    static contextType= LionessContext;
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
                <NavBar/>
                <ProjectSearchBar/>
                <Project/>
            </div>
        )
    }
}