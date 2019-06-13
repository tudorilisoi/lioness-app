import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';
import EditUser from '../EditUser/EditUser'

export default class Contractor extends Component{
    static contextType= LionessContext
    constructor(){
        super()
        this.state = {
            expandedIndex: false,
            editModeIndex: false,
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
    render(){
        const contractors= this.context.users.data.map((user, index)=>{          
            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const isEditing = this.state.editModeIndex === index
        const editingModeClassName=isEditing ? 'show':''
            const contractorDetails= 
            <section key={user.id}>
                <button className='collapsible' onClick={()=> {this.toggle(index)}}>{user.full_name}
                <p><span>Active Projects:{user.projects ? user.projects.filter(project=>project.status.title==='in progress').length : "0"}</span></p>
               </button>
     <div className={`button-content ${expandedClassName}`}>
         {/* <p><span>Name:</span>{user.full_name}</p>
         <p><span>Email :</span>{user.email}</p> */}
     <button>Delete</button>
                        <button onClick={() => this.toggleeditModeIndex(index)}>Edit</button>
                        <EditUser user={user} editMode={isEditing} role={this.props.role}/>
                        <button className={`saveButton ${editingModeClassName}`}>Save</button>
    
    </div>
            </section>
            return contractorDetails
        })
        return(
            <div  className='tab-content'>
                {contractors}
            </div>
        )
    }
}