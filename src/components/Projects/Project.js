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

        const projects = this.context.projects.map((project, index) => {
            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const projectDetails =
                <section key={project.id}>
                    <button className='collapsible' onClick={() => { this.toggle(index) }}>{project.title}
                        <em>${project.budget}</em></button>
                    
                        <div className={`project-content ${expandedClassName}`}>
                            <p><em>Title:</em>{project.title}</p>
                            <p><em>Client:</em>{project.client[0].full_name}</p>
                            <p><em>Project Manager:</em>{project.projectManager[0].full_name}</p>
                            <p><em>Description :</em>{project.description}</p>
                            <p><em>Budget:</em>{project.budget}</p>
                            <p><em>Status:</em>{project.status.title}</p>
                            <p><em>Start Date:</em>{project.startDate}</p>
                            {project.estimatedDueDate ? <p><em>Estimated Due Date:</em>{project.estimatedDueDate}</p> : ""}
                            {project.completionDate ? <p><em>Completion Date:</em>{project.completionDate}</p> : ''}
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