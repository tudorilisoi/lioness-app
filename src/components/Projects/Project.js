import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';
export default class Project extends Component{
    static contextType= LionessContext
render(){
    const projects= this.context.projects.map(project=>{
        return <div>
 <ul>
     <li>Title:{project.title}</li>
     {/* <li>Client:{project.client[0].full_name}</li>
    <li>Project Manager:{project.projectManager[0].full_name}</li>
    <li>Description :{project.description}</li>
     <li>Budget:{project.budget}</li>
   <li>Status:{project.status}</li>
    <li>Start Date:{project.startDate}</li>
     <li>Estimated Due Date:{project.estimatedDueDate}</li>
    <li>Completion Date:{project.completionDate}</li>  */}
</ul>
        </div>
    })
    console.log(this.context.projects)
    return(
        <div>
            {projects}
            </div>
    )
}
}