import React, {Component} from 'react';
import LionessContext from '../../LionessContext/LionessContext';

export default class Client extends Component{
static contextType= LionessContext
    

render(){  
    const clients= this.context.users.map(user=>{
        const clientDetails= 
        <section key={user.id}>
            <button className='collapsible'>{user.full_name}
            
           </button>
 <div className='Content'>
     <p><em>Name:</em>{user.full_name}</p>
     <p><em>Email :</em>{user.email}</p>
     <p><em>Phone :</em>{user.phone}</p>
 

</div>
        </section>
        return clientDetails
    })
        return(
            <div>
              {clients}
                </div>
        )
    }
}