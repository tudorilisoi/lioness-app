import React, { Component } from 'react'
import LionessContext from '../../LionessContext/LionessContext';
import './Project.css'
export default class Project extends Component {
    static contextType = LionessContext
    constructor() {
        super()
        this.state = {
            expandedIndex: false,
        }
    }
    toggle = (index) => {
        const { expandedIndex } = this.state
        this.setState({
            expandedIndex: expandedIndex === index ? -1 : index
        })
    }
    render() {
        // debugger
        const projects = this.context.projects.data.map((project, index) => {
            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const projectDetails =
                <section key={project.id}>
                    <button className='collapsible' onClick={() => { this.toggle(index) }}>{project.title}
                        <span>${project.budget}</span>  
                        {project.status.id===1 ? <span>Start Date: {project.startDate} </span>: ""}
                        {project.status.id===2 ? <span>Estimated Due Date: {project.estimatedDueDate} </span>: ""}
                        {project.status.id===3 ? <span>Completion Date: {project.completionDate} </span>: ""}
                        
                        </button>
                    
                        <div className={`button-content ${expandedClassName}`}>
                        <button>Delete</button>
                            <p><span>Title:</span>{project.title}</p>
                            <p><span>Client:</span>{project.client[0].full_name}</p>
                            <p><span>Project Manager:</span>{project.projectManager[0].full_name}</p>
                            <p><span>Description :</span>{project.description}</p>
                            <p><span>Budget:</span>{project.budget}</p>
                            <p><span>Status:</span>{project.status.title}</p>
                            <p><span>Start Date:</span>{project.startDate}</p>
                            {project.estimatedDueDate ? <p><span>Estimated Due Date:</span>{project.estimatedDueDate}</p> : ""}
                            {project.completionDate ? <p><span>Completion Date:</span>{project.completionDate}</p> : ''}
                        </div>
                    
                </section>
            return projectDetails
        })

        return (
            <div className='tab-content'>
                {projects}
            </div>
        )
    }
}