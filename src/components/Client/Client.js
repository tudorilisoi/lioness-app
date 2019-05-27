import React, {Component} from 'react';
import LionessContext from '../../LionessContext/LionessContext';

export default class Client extends Component{
static contextType= LionessContext
    render(){
        const clients = this.context.users.filter(user=>user.role.id===2)
        const makeClientList= clients.map(client=>{
            return <div>

<input type="checkbox"/>
<ul>
        
        <li>Name: {client.full_name}</li>
       <li>Email: {client.email}</li> 
       <li>Phone: {client.phone}</li>
       <li>Notes: This client is important!</li>
</ul>
            </div>
        })
        return(
            <div>
                {makeClientList}
                </div>
        )
    }
}