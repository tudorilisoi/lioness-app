import React, {Component} from 'react'
import './LoginForm.css'
export default class LoginForm extends Component{
    render(){
        return(
            <div className='LoginForm-Container'>
                <h2>Login</h2>
            <form className='LoginForm'> 
                <label htmlFor='email'> Email:</label>
                <input type='text' id='email'/>
                <label htmlFor= 'password'> Password:</label>
                <input type ='password' id ='password'/>
                <button type='submit'>Submit</button>
            </form> 
             </div>
        )
    }
}