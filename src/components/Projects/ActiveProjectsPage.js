import React, {Component} from 'react';
import Project from './Project'
import ProjectSearchBar from './ProjectSearchBar'
import ds from '../../STORE/dataservice';
import DataLoader from '../DataLoader/DataLoader'
import LionessContext from '../../LionessContext/LionessContext'
const {getUsers, getProjects, handleFetchError }  =ds
export default class ActiveProjectsPage extends Component{
    constructor(props) {
        super(props)
        this.projectRef = null;
    }
    static contextType= LionessContext;
 
    render(){
        const opts= {statusFilter: 'in progress'}
        return(
            <div className='tab-page'>               
                <h2>Active Projects</h2>
                <button className='add-project'  onClick={ev=>{this.projectRef && this.projectRef.addProject()}}>Add Project</button>
                <ProjectSearchBar status={opts.statusFilter}/>
                <Project ref={ref => this.projectRef = ref} />
            </div>
        )
    }
}