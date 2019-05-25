import React, {Component} from 'react'
class LoginForm extends Component{
    render(){
        return(
            <form>
              <div className='LoginForm'>
                <h2>Login</h2>
                <label htmlFor='email'> Email:</label>
                <input type='text' id='email'/>
                <label htmlFor= 'password'> Password:</label>
                <input type ='password' id ='password'/>
                <button type='submit'>Submit</button>
              </div>
            </form> 
        )
    }
}