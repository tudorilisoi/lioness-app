import React, { Component } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import LionessContext from '../../LionessContext/LionessContext';
import EditProject from '../EditProject/EditProject'
import './Project.css'
const newProjectTemplate = {
    id: -1,
    title: '',
    status: {},
    description: '',
    startDate: '',
    estimatedDueDate: '',
    completionDate: '',
    budget: '',
    estimatedDueDate: '',
    client: {},
    projectManager: {},
    contractors: []
};



export default class Project extends Component {
    static contextType = LionessContext
    constructor() {
        super()
        this.state = {
            expandedIndex: false,
            editModeIndex: false,
            newProject: null,
        }
    }
    toggle = (index) => {
        const { expandedIndex } = this.state
        this.setState({
            expandedIndex: expandedIndex === index ? -1 : index
        })
    }

    toggleeditModeIndex = (index) => {
        const { editModeIndex } = this.state
        this.setState({
            editModeIndex: editModeIndex === index ? -1 : index
        })
    }
    addProject = () => {
        this.setState({
            editModeIndex: 0,
            expandedIndex: 0,
            newProject: { ...newProjectTemplate }
        })
    }
    cancelAddProject = () => {
        this.setState({
            editModeIndex: false,
            expandedIndex: false,
            newProject: null
        })
    }
    render() {
        // debugger
        const projectsList = [...this.context.projects.data]
        if (this.state.newProject) {
            projectsList.unshift(this.state.newProject)
            console.log(projectsList)
        }

        const projects = projectsList.map((project, index) => {
            const isEditing = this.state.editModeIndex === index

            const isExpanded = this.state.expandedIndex === index
            const editingModeClassName = isEditing ? 'show' : ''
            const projectDetails =
                <section key={project.id}>
                    <div className={classnames('collapsible', isExpanded ? 'hide' : null)}
                        onClick={() => { this.toggle(index) }}>
                        <Icon className='r-spaced' icon={isExpanded ? 'minus' : 'plus'} />
                        {project.title}
                        {!this.state.newProject ? <span>${project.budget}</span> : ''}
                        {project.status.id === 1 ? <span>Start Date: {project.startDate} </span> : ""}
                        {project.status.id === 2 ? <span>Estimated Due Date: {project.estimatedDueDate} </span> : ""}
                        {project.status.id === 3 ? <span>Completion Date: {project.completionDate} </span> : ""}

                    </div>

                    <div className={classnames('button-content', isExpanded ? 'expanded' : null)}>
                        <div className='padded'>
                            <div className='actionButtonsWrapper'>
                                {!this.state.newProject ? <button className='actionButton'><Icon icon="trash" /> Delete</button> : ''}
                                {!this.state.newProject ?
                                    <button className='actionButton' onClick={() => this.toggleeditModeIndex(index)}><Icon icon="edit" /> Edit</button> : ''}
                                    <button><Icon icon='fa-close'/></button>
                            </div>
                            <EditProject project={project} editMode={isEditing} />
                            <div>
                                <button
                                    onClick={() => {
                                        //TODO write a saveProject function in ds
                                        //TODO save and reload after that
                                        console.log(this.context)
                                        this.context.reloadProjects()
                                    }}
                                    className={`saveButton ${editingModeClassName}`}>Save</button>
                                <button onClick={() => this.cancelAddProject()} className={`saveButton ${editingModeClassName}`}>Cancel</button>
                            </div>
                        </div>
                    </div>

                </section>
            return projectDetails
        })
        console.log(`what is happening`, projects)
        return (
            <div className='tab-content'>
                {projects}
            </div>
        )
    }
}