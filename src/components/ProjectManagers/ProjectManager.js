import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';
import EditUser from '../EditUser/EditUser'
const newProjectManagerTemplate = {
    id: -1,
    email: '',
    username: '',
    full_name: '',
    phone: '',
    password: '',
    //associated objects
    role: null, //TODO add a role object
    // isAdmin: true,
    projects: []
}

export default class ProjectManager extends Component{
    static contextType= LionessContext
    constructor(){
        super()
        this.state = {
            expandedIndex: false,
            editModeIndex: false,
            newProjectManager: null,
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
    addPm = () => {
        this.setState({
            editModeIndex: 0,
            expandedIndex: 0,
            newProjectManager: { ...newProjectManagerTemplate }
        })
    }
    cancelAddPm=()=>{
        this.setState({
            editModeIndex: false,
            expandedIndex: false,
            newProjectManager: null
        })
    }
    render(){
        const projectManagersList= [...this.context.users.data]
        if(this.state.newProjectManager){
            projectManagersList.unshift(this.state.newProjectManager)
        }
        const projectManagers= projectManagersList.map((user, index)=>{          
            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const isEditing = this.state.editModeIndex === index
        const editingModeClassName=isEditing ? 'show':''
            const projectManagerDetails= 
            <section key={user.id}>
                <button className='collapsible' onClick={()=> {this.toggle(index)}}>{user.full_name}
                {!this.state.newProjectManager ? <p><span>Active Projects:{user.projects ? user.projects.filter(project=>project.status.title==='in progress').length : "0"}</span></p> : ''}
               </button>
     <div className={`button-content ${expandedClassName}`}>
     {!this.state.newProjectManager ?  <button>Delete</button> :''}
                        {!this.state.newProjectManager ?  <button onClick={() => this.toggleeditModeIndex(index)}>Edit</button> : ''}
                        <EditUser user={user} editMode={isEditing} role={this.props.role}/>
                        <button className={`saveButton ${editingModeClassName}`}>Save</button>
                        <button onClick={()=>this.cancelAddPm()} className={`saveButton ${editingModeClassName}`}>Cancel</button>
    
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