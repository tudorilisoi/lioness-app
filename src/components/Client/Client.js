import React, {Component} from 'react';
import LionessContext from '../../LionessContext/LionessContext';

export default class Client extends Component{
static contextType= LionessContext
constructor(){
    super()
    this.state= {
        on: false,
    }
}
toggle=()=>{
    this.setState({
        on: !this.state.on
    })
}

render(){  
    const clients= this.context.users.map(user=>{
        const clientDetails= 
        <section key={user.id}>
            <button className='collapsible' onClick={this.toggle}>{user.full_name}
            
           </button>
           {this.state.on &&
        
 <div className='client-content'>
     <p><em>Name:</em>{user.full_name}</p>
     <p><em>Email :</em>{user.email}</p>
     <p><em>Phone :</em>{user.phone}</p>
 

</div>
}
        </section>
        return clientDetails
    })
        return(
            <div className='tab-content'>
              {clients}
                </div>
        )
    }
}