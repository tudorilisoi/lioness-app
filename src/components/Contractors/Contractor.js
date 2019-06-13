import React, {Component} from 'react'
import LionessContext from '../../LionessContext/LionessContext';
import EditUser from '../EditUser/EditUser'
const newContractorTemplate = {
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
};
export default class Contractor extends Component{
    static contextType= LionessContext
    constructor(){
        super()
        this.state = {
            newContractor: null,
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
    addContractor = () => {
        this.setState({
            editModeIndex: 0,
            expandedIndex: 0,
            newContractor: { ...newContractorTemplate }
        })
    }
    cancelAddContractor=()=>{
        this.setState({
            editModeIndex: false,
            expandedIndex: false,
            newContractor: null
        })
    }

    render(){
        const contractorsList=[...this.context.users.data]
        if (this.state.newContractor) {
            contractorsList.unshift(this.state.newContractor)
        }
        const contractors= contractorsList.map((user, index)=>{          
            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const isEditing = this.state.editModeIndex === index
        const editingModeClassName=isEditing ? 'show':''
            const contractorDetails= 
            <section key={user.id}>
                <button className='collapsible' onClick={()=> {this.toggle(index)}}>{user.full_name}
                {!this.state.newContractor ? <p><span>Active Projects:{user.projects ? user.projects.filter(project=>project.status.title==='in progress').length : "0"}</span></p> : ''}
               </button>
     <div className={`button-content ${expandedClassName}`}>
         
     {!this.state.newContractor ?  <button>Delete</button> :''}
                        {!this.state.newContractor ?  <button onClick={() => this.toggleeditModeIndex(index)}>Edit</button> : ''}
                        <EditUser user={user} editMode={isEditing} role={this.props.role}/>
                        <button className={`saveButton ${editingModeClassName}`}>Save</button>
                        <button onClick={()=>this.cancelAddContractor()} className={`saveButton ${editingModeClassName}`}>Cancel</button>
    
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