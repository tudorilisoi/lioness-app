import React, {Component} from 'react';
import Project from './Project'
import ProjectSearchBar from './ProjectSearchBar'
import ds from '../../STORE/dataservice';
import DataLoader from '../DataLoader/DataLoader'
import LionessContext from '../../LionessContext/LionessContext'
const {getUsers, getProjects, handleFetchError }  =ds
export default class ActiveProjectsPage extends Component{
    static contextType= LionessContext;
 
    render(){
        const opts= {statusFilter: 'in progress'}
        return(
            <div className='tab-page'>               
                <h2>Active Projects</h2>
                <ProjectSearchBar status={opts.statusFilter}/>
                <Project />
            </div>
        )
    }
}