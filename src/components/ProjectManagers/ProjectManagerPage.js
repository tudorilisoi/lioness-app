import React, {Component} from 'react'
import DataLoader from '../DataLoader/DataLoader'
import LionessContext from '../../LionessContext/LionessContext';
import ds from '../../STORE/dataservice';
import NavBar from'../Nav/Nav';
import BackButton from '../BackButton/BackButton'
import ProjectManager from './ProjectManager'
const {getUsers, getProjects, handleFetchError }  =ds
export default class ProjectManagerPage extends Component{
    static contextType= LionessContext
render(){
    const opts= {roleFilter: 4}
    return(
        <div>
            <DataLoader 
                onReject = {handleFetchError}
                promise={getProjects()} 
                onDataLoaded={this.context.setProjects}/>
                <DataLoader 
                promise={getUsers(opts)} 
                onReject = {handleFetchError}
                onDataLoaded={this.context.setUsers}/>
                <NavBar />
                <h2>Project Managers</h2>
                <BackButton history={this.props.history}/>
                <ProjectManager/>
        </div>
    )
}
}