import React, {Component} from 'react';
import './LandingPage.css'
import { Link } from 'react-router-dom';

export default class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
             
            <h2>Welcome to Lioness!</h2>
            <p>Lioness is a project management tool,
                built to organize your organization's 
                clients, project managers and contractors</p>
                
           <Link to={`/login`}>
           <button>Log In</button>
           </Link>
           
            </div>
        )
    }
}