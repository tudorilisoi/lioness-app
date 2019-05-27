import React, {Component} from 'react';
import LionessContext from '../../LionessContext/LionessContext'
import Client from '../Client/Client'
import Navbar from '../Nav/Nav'
export default class ClientPage extends Component{

    render(){
        return(
            <div>
                <Navbar/>
                <h2>Clients</h2>
                <button>Add Client</button>
                 <Client />
            </div>
        )
    }
}