import React, { Component } from 'react';
import LionessContext from '../../LionessContext/LionessContext';
import ProjectList from './ProjectList';
import ProjectSearchBar from './ProjectSearchBar';
export default class ProjectsPage extends Component {
    constructor(props) {
        super(props)
        this.projectRef = null;
    }
    static contextType = LionessContext;

    render() {
        let title
        switch (this.props.statusFilter) {
            case 1:
                title = 'Estimate Projects'
                break;
            case 2:
                title = 'Active Projects'
                break;
            case 3:
                title = 'Billed Projects'
                break;
            default:
                break;
        }
        return (
            <div className='tab-page'>
                <button className='add-project' onClick={ev => { this.projectRef && this.projectRef.addProject() }}>Add Project</button>
                <h2>{title}</h2>
                <ProjectSearchBar status={this.props.statusFilter} />
                <ProjectList ref={ref => this.projectRef = ref} />
            </div>
        )
    }
}