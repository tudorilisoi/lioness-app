import React, {Component} from 'react'
import Navbar from '../Nav/Nav'
import LionessContext from '../../LionessContext/LionessContext'
import Client from '../Client/Client'
import {Link} from 'react-router-dom'
export default class AdminDash extends Component{
static contextType= LionessContext;
    render(){        
        return(
            <div>
                <Navbar/>
                <Link to='/clients'>
               <h2>Clients</h2>
               </Link>
               <Link to='/projects'>
                   <h2>Projects</h2>
               </Link>
            </div>
        )
    }
}