import React, { Component } from 'react'
import LionessContext from '../../LionessContext/LionessContext';
import EditProject from '../EditProject/EditProject'
import './Project.css'
const newProjectTemplate = {
    id:-1,
    title: '',
        status: {},
        description: '',
        startDate: '',
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
    cancelAddProject=()=>{
        this.setState({
            editModeIndex: false,
            expandedIndex: false,
            newProject: null
        })
    }
    render() {
        // debugger
        const projectsList=[...this.context.projects.data]
        if(this.state.newProject){
            projectsList.unshift(this.state.newProject)
            console.log(projectsList)
        }
        
        const projects = projectsList.map((project, index) => {
            const isEditing = this.state.editModeIndex === index

            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const editingModeClassName = isEditing ? 'show' : ''
            const projectDetails =
                <section key={project.id}>
                    <button className='collapsible' onClick={() => { this.toggle(index) }}>{project.title}
                       
                        {!this.state.newProject ? <span>${project.budget}</span> :''}
                {project.status.id === 1 ? <span>Start Date: {project.startDate} </span> : ""}
                {project.status.id === 2 ? <span>Estimated Due Date: {project.estimatedDueDate} </span> : ""}
                {project.status.id === 3 ? <span>Completion Date: {project.completionDate} </span> : ""}

                    </button>

                    <div className={`button-content ${expandedClassName}`}>
                       { !this.state.newProject? <button>Delete</button> :''}
                        {!this.state.newProject? <button onClick={() => this.toggleeditModeIndex(index)}>Edit</button>:''}
                        <EditProject project={project} editMode={isEditing} />
                        <button
                            onClick={() => {
                                //TODO write a saveProject function in ds
                                //TODO save and reload after that
                                console.log(this.context)
                                this.context.reloadProjects()
                            }}
                            className={`saveButton ${editingModeClassName}`}>Save</button>
                    </div>

                </section>
            return projectDetails
        })
console.log(`what is happening`,projects)
        return (
            <div className='tab-content'>
                {projects}
            </div>
        )
    }
}