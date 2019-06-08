import React, {Component} from 'react';


export default class AddClientForm extends Component{
render(){
    return(
        <div className='add-client-form'>

        <form>
            <label htmlFor='client-name'>Name:</label>
            <input type='text'/>
            <label htmlFor='email'>Email:</label>
            <input type='email'/>
            <label htmlFor='client-phone'>Phone:</label>
            <input type='tel'/>
        </form>
        </div>
    )
}
}