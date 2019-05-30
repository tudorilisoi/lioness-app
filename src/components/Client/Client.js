import React, {Component} from 'react';
import LionessContext from '../../LionessContext/LionessContext';

export default class Client extends Component{
static contextType= LionessContext
    

render(){
    console.log(this.context)
        const clients = this.context.users.filter(user=>user.role.id===2)
        const makeClientList= clients.map((client, i)=>{
            return <div>

<input type="checkbox"/>
<ul>
        
        <li key={i}>Name: {client.full_name}</li>
       <li key={i}>Email: {client.email}</li> 
       <li key={i}>Phone: {client.phone}</li>
       <li key={i}>Notes: This client is important!</li>
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