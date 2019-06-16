import React, { Component } from 'react';
import Project from './Project'
import ProjectSearchBar from './ProjectSearchBar'
import ds from '../../STORE/dataservice';
import DataLoader from '../DataLoader/DataLoader'

import LionessContext from '../../LionessContext/LionessContext'
const { getUsers, getProjects, handleFetchError, getRoles, getStatuses } = ds
export default class EstimatesPage extends Component {
    constructor(props) {
        super(props)
        this.projectRef = null;
    }
    static contextType = LionessContext;
    static opts = {
        statusFilter: 1,
        //TODO make it filter with status number
    }

    // TODO remove this!! It is disabled anyway because I prefixed with a _
    // this is just an example on how to fetch multiple promises
    //data is now loaded in src/components/Projects/ProjectSearchBar.js, at componentDidMount
    _componentDidMount() {

        console.log(this.props)

        const dataFetchPromise = Promise.all([
            getProjects(EstimatesPage.opts),
            getUsers(),
            getRoles(),
            getStatuses(),
        ])
        const onDataLoaded = (arr) => {
            console.log('DATA loaded')
            // NOTE order is the same as in the above Promise.all
            const [projects, users, roles, statuses] = arr
            this.context.setProjects(projects)
            this.context.setUsers(users)
            this.context.setRoles(roles)
            this.context.setStatuses(statuses)
        }
        dataFetchPromise.then(onDataLoaded).catch(handleFetchError)

    }

    render() {

        return (
            <div className='tab-page'>
                <h2>Estimates</h2>
                <button className='add-project' onClick={ev=>{this.projectRef && this.projectRef.addProject()}}>Add Project</button>
                <ProjectSearchBar status={EstimatesPage.opts.statusFilter} />
                <Project ref={ref => this.projectRef = ref} />
            </div>
        )
    }
}