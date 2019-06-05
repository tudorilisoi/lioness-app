import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';

export default class ProjectManager extends Component{
    static contextType= LionessContext
    constructor(){
        super()
    }
    render(){
        const projectManagers= this.context.users.map(user=>{          
            const projectManagerDetails= 
            <section key={user.id}>
                <button className='collapsible'>{user.full_name}
                <p><em>Active Projects:{user.projects ? user.projects.filter(project=>project.status.title==='in progress').length : "0"}</em></p>
               </button>
     <div className='projectManager-content'>
         <p><em>Name:</em>{user.full_name}</p>
         <p><em>Email :</em>{user.email}</p>
     
    
    </div>
            </section>
            return projectManagerDetails
        })
        return(
            <div  className='tab-content'>
                {projectManagers}
            </div>
        )
    }
}