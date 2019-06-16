import React, { Component } from 'react';
import LionessContext from '../../LionessContext/LionessContext';
import EditUser from '../EditUser/EditUser'
import './editContent.css'
const newUserTemplate = {
    id: -1,
    email: '',
    full_name: '',
    phone: '',
    password: '',
    //associated objects
    role: null, //TODO add a role object
    // isAdmin: true,
    projects: []
};


export default class User extends Component {
    static contextType = LionessContext
    constructor() {
        super()
        this.state = {
            newUser: null,
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

    addUser = () => {
        this.setState({
            editModeIndex: 0,
            expandedIndex: 0,
            newUser: { ...newUserTemplate }
        })
    }
    cancelAddUser=()=>{
        this.setState({
            editModeIndex: false,
            expandedIndex: false,
            newUser: null
        })
    }


    render() {
        // debugger
        const UsersList = [...this.context.users.data]
        if (this.state.newUser) {
            UsersList.unshift(this.state.newUser)
        }
        const Users = UsersList.map((user, index) => {
            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const isEditing = this.state.editModeIndex === index
            const editingModeClassName = isEditing ? 'show' : ''
            const UserDetails =
                <section key={user.id}>
                  { !this.state.newUser ? <button className={`collapsible ${expandedClassName}` }onClick={() => { this.toggle(index) }} ><a className='userName'>{user.full_name}</a>
                    {!this.state.newUser ? <>
                    { this.props.role !==2 ? 
                    
                    <p><em>Active Projects:{user.projects ? user.projects.filter(project=>project.status.title==='in progress').length : "0"}</em></p> : ''}
                    </> :''}
                    </button> : ''}


                    <div className={`button-content ${expandedClassName}`}>
                    <div >
                    {!this.state.newUser ?  <button>Delete</button> :''}
                    {!this.state.newUser ?  <button onClick={() => this.toggleeditModeIndex(index)}>Edit</button> : ''}
                    </div>
                    
                        <EditUser user={user} editMode={isEditing} role={this.props.role} />
                        <div className={`editMode-buttons ${editingModeClassName}`}>
                        <button className='saveButton' >Save</button>
                            <button className='saveButton' onClick={()=>this.cancelAddUser()}>Cancel</button>
                            </div>
                    </div>

                </section>
            return UserDetails
        })
        return (
            <div className='tab-content'>
                {Users}
            </div>
        )
    }
}