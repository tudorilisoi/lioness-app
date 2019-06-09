import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';

export default class ProjectManager extends Component{
    static contextType= LionessContext
    constructor(){
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
    render(){
        const projectManagers= this.context.users.map((user, index)=>{          
            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const projectManagerDetails= 
            <section key={user.id}>
                <button className='collapsible' onClick={()=> {this.toggle(index)}}>{user.full_name}
                <p><span>Active Projects:{user.projects ? user.projects.filter(project=>project.status.title==='in progress').length : "0"}</span></p>
               </button>
     <div className={`button-content ${expandedClassName}`}>
         <p><span>Name:</span>{user.full_name}</p>
         <p><span>Email :</span>{user.email}</p>
     
    
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