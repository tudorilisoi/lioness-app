import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';
import './Project.css'
export default class Project extends Component{
    static contextType= LionessContext
    constructor(){
        super()
        this.state= {
            on: false,
        }
    }
    toggle=()=>{
        this.setState({
            on: !this.state.on
        })
    }
render(){
    
    const projects= this.context.projects.map(project=>{
        
        const projectDetails= 
        <section key={project.id}>
            <button className='collapsible'onClick={this.toggle}>{project.title}
            <em>${project.budget}</em></button>
{this.state.on &&
 <div className='project-content'>
     <p><em>Title:</em>{project.title}</p>
     <p><em>Client:</em>{project.client[0].full_name}</p>
     <p><em>Project Manager:</em>{project.projectManager[0].full_name}</p>
     <p><em>Description :</em>{project.description}</p>
     <p><em>Budget:</em>{project.budget}</p>
     <p><em>Status:</em>{project.status.title}</p>
     <p><em>Start Date:</em>{project.startDate}</p>
     {project.estimatedDueDate ? <p><em>Estimated Due Date:</em>{project.estimatedDueDate}</p> : ""}
     {project.completionDate ?  <p><em>Completion Date:</em>{project.completionDate}</p> : ''}
</div>
}
        </section>
        return projectDetails
    })
   
    return(
        <div className='tab-content'>
            {projects}
            </div>
    )
}
}