import React, { Component } from 'react';
import LionessContext from '../../LionessContext/LionessContext'
import UserSearchBar from '../UserSearchBar/UserSearchBar'
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
                <h2>Clients</h2>
                <div className='user-buttons'>
                <button onClick={ev=>{this.userRef && this.userRef.addUser()}}>Add Client</button>
                <button>Email Client</button>
                </div>
                <UserSearchBar role={opts.roleFilter} />
                
                <User ref={ref => this.userRef = ref} role={opts.roleFilter} />
            </div>
        )
    }
}