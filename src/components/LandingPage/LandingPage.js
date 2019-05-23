import React, {Component} from 'react';

export default class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
            <h2>Welcome to Lioness!</h2>
            <p>Lioness is a project management tool,
                built to organize your organization's 
                clients, project managers and contractors</p>
           <button>Log In</button>
            </div>
        )
    }
}