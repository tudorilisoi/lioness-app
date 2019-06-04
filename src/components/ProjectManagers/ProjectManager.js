import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';

export default class ProjectManager extends Component{
    static contextType= LionessContext
    constructor(){
        super()
    }
    render(){
        console.log(this.context.users)
        const projectManagers= this.context.users.map(user=>{
            console.log(user.projects.filter(project=>project.status.title==='in progress').length)
            const projectManagerDetails= 
            <section key={user.id}>
                <button className='collapsible'>{user.full_name}
                
                {/* {user.project ? console.log(user.project.map(project=>project.status==='in progress').length) : console.log("0")} */}
                <p><em>Active Projects:{user.projects ? user.projects.filter(project=>project.status==='in progress').length : "0"}</em></p>
               </button>
     <div className='Content'>
         <p><em>Name:</em>{user.full_name}</p>
         <p><em>Email :</em>{user.email}</p>
     
    
    </div>
            </section>
            return projectManagerDetails
        })
        return(
            <div>
                {projectManagers}
            </div>
        )
    }
}