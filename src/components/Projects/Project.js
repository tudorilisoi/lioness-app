import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';
import './Project.css'
export default class Project extends Component{
    static contextType= LionessContext
render(){
    console.log(this.props)
    const projects= this.context.projects.map(project=>{
        const projectDetails= 
        <section key={project.id}>
            <button className='collapsible'>{project.title}
            <em>${project.budget}</em></button>
 <div className='Content'>
     <p><em>Title:</em>{project.title}</p>
     <p><em>Client:</em>{project.client[0].full_name}</p>
     <p><em>Project Manager:</em>{project.projectManager[0].full_name}</p>
     <p><em>Description :</em>{project.description}</p>
     <p><em>Budget:</em>{project.budget}</p>
     <p><em>Status:</em>{project.status}</p>
     <p><em>Start Date:</em>{project.startDate}</p>
     <p><em>Estimated Due Date:</em>{project.estimatedDueDate}</p>
     <p><em>Completion Date:</em>{project.completionDate}</p>
</div>
        </section>
        return projectDetails
    })
   
    return(
        <div id= 'projects' className='projects'>
            {projects}
            </div>
    )
}
}