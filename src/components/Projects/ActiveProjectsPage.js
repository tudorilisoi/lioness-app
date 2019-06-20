import React, { Component } from 'react';
import LionessContext from '../../LionessContext/LionessContext';
import Project from './Project';
import ProjectSearchBar from './ProjectSearchBar';
export default class ActiveProjectsPage extends Component{
    constructor(props) {
        super(props)
        this.projectRef = null;
    }
    static contextType= LionessContext;
 
    render(){
        const opts= {statusFilter: 2}
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