import React, {Component} from 'react'
import './Nav.css'
export default class Navbar extends Component{
    render(){
    return(
        <nav role='navigation' className="navBar">
        <h3>Welcome User!</h3>
        <h4>Team Name: </h4>
        </nav>
    )
}
}