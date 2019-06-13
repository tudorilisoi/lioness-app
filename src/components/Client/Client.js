import React, { Component } from 'react';
import LionessContext from '../../LionessContext/LionessContext';
import EditUser from '../EditUser/EditUser'

const newClientTemplate = {
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


export default class Client extends Component {
    static contextType = LionessContext
    constructor() {
        super()
        this.state = {
            newClient: null,
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

    addClient = () => {
        this.setState({
            editModeIndex: 0,
            expandedIndex: 0,
            newClient: { ...newClientTemplate }
        })
    }
    cancelAddClient=()=>{
        this.setState({
            editModeIndex: false,
            expandedIndex: false,
            newClient: null
        })
    }


    render() {
        // debugger
        const clientsList = [...this.context.users.data]
        if (this.state.newClient) {
            clientsList.unshift(this.state.newClient)
        }
        const clients = clientsList.map((user, index) => {
            const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
            const isEditing = this.state.editModeIndex === index
            const editingModeClassName = isEditing ? 'show' : ''
            const clientDetails =
                <section key={user.id}>
                    <button className='collapsible' onClick={() => { this.toggle(index) }}>{user.full_name}

                    </button>


                    <div className={`button-content ${expandedClassName}`}>

                        {!this.state.newClient ?  <button>Delete</button> :''}
                        {!this.state.newClient ?  <button onClick={() => this.toggleeditModeIndex(index)}>Edit</button> : ''}
                        <EditUser user={user} editMode={isEditing} role={this.props.role} />
                        <button className={`saveButton ${editingModeClassName}`}>Save</button>
                            <button onClick={()=>this.cancelAddClient()}className={`saveButton ${editingModeClassName}`}>Cancel</button>
                    </div>

                </section>
            return clientDetails
        })
        return (
            <div className='tab-content'>
                {clients}
            </div>
        )
    }
}