import React, { Component } from 'react';
import LionessContext from '../../LionessContext/LionessContext'
import UserSearchBar from '../UserSearchBar/UserSearchBar'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import User from './User'

export default class ClientPage extends Component {
    constructor(props) {
        super(props)
        this.userRef = null;
    }
    static contextType = LionessContext;
    render() {
        const opts = { roleFilter: 2 }
        return (
            <div className='tab-page'>
                <div className="padded">
                <button className='addButton' onClick={ev=>{this.userRef && this.userRef.addUser()}}>
                <Icon icon="user-plus" />
                Add Client
                </button>
                <h2 className="barTitle">Clients</h2>
                {/* <button>Email Client</button> */}
                <UserSearchBar role={opts.roleFilter} />
                </div>
                <User ref={ref => this.userRef = ref} role={opts.roleFilter} />
            </div>
        )
    }
}