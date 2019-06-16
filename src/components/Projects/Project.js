import React, { Component } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import LionessContext from '../../LionessContext/LionessContext';
import EditProject from '../EditProject/EditProject'
import dayjs from "dayjs";
import './Project.css'
const newProjectTemplate = {
    id: -1,
    title: '',
    status: {},
    description: '',
    start_date: '',
    estimated_due_date: '',
    completion_date: '',
    budget: '',
    estimated_due_date: '',
    client: {},
    manager: {},
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
    dateForInput=(dateString)=> {
        return dayjs(dateString).format("YYYY-MM-DD");
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
                    <div className={classnames('collapsible', isExpanded ? '' : null)}
                        onClick={() => { this.toggle(index) }}>
                        <div className='collapsibleInner'>

                            <Icon className='r-spaced' icon={isExpanded ? 'chevron-down' : 'chevron-right'} />
                            {project.title}
                            {!this.state.newProject ? <span>${project.budget}</span> : ''}
                            {project.status.id === 1 ? <span>Start Date: {this.dateForInput(project.start_date)} </span> : ""}
                            {project.status.id === 2 ? <span>Estimated Due Date: {this.dateForInput(project.estimated_due_date)} </span> : ""}
                            {project.status.id === 3 ? <span>Completion Date: {this.dateForInput(project.completion_date)} </span> : ""}
                        </div>

                    </div>

                    <div className={classnames('button-content', isExpanded ? 'expanded' : null)}>
                        <div className='padded'>
                            <div className='actionButtonsWrapper'>
                                {!this.state.newProject ? <button className='actionButton'><Icon icon="trash" /> Delete</button> : ''}
                                {!this.state.newProject ?
                                    <button className='actionButton' onClick={() => this.toggleeditModeIndex(index)}><Icon icon="edit" /> Edit</button> : ''}
                                {/* <a
                                    onClick={() => { this.toggle(index) }}
                                    href="#" className='closeButton'>
                                    <Icon icon='times' />
                                </a> */}
                            </div>
                            <EditProject project={project} editMode={isEditing} />
                            <div className='buttonsRow'>
                                <button
                                    onClick={() => {
                                        //TODO write a saveProject function in ds
                                        //TODO save and reload after that
                                        console.log(this.context)
                                        this.context.reloadProjects()
                                    }}
                                    className={`saveButton flexed ${editingModeClassName}`}>Save</button>
                                <button onClick={() => this.cancelAddProject()} className={`cancelButton flexed ${editingModeClassName}`}>Cancel</button>
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