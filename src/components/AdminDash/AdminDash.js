import React, {Component} from 'react'
import Navbar from '../Nav/Nav'
import LionessContext from '../../LionessContext/LionessContext'
import Client from '../Client/Client'
export default class AdminDash extends Component{
static contextType= LionessContext;
    render(){
        const clients=this.context.users.filter(user=> user.role.id===2)
        
        return(
            <div>
                <Navbar/>
                <Client />
            </div>
        )
    }
}