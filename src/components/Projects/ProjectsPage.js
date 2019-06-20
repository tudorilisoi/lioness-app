import React, { Component } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
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
                <div className="padded">
                    <button className='addButton' onClick={ev => { this.projectRef && this.projectRef.addProject() }}>
                        <Icon icon="folder-plus" /> Add Project
                        </button>
                    <h2 className="barTitle">{title}</h2>
                    <ProjectSearchBar status={this.props.statusFilter} />
                </div>
                <ProjectList ref={ref => this.projectRef = ref} />
            </div>
        )
    }
}