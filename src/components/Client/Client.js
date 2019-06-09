import React, {Component} from 'react';
import LionessContext from '../../LionessContext/LionessContext';

export default class Client extends Component{
static contextType= LionessContext
constructor(){
    super()
    this.state = {
        expandedIndex: false,
    }
}
toggle = (index) => {
    const { expandedIndex } = this.state
    this.setState({
        expandedIndex: expandedIndex === index ? -1 : index
    })
}

render(){  
    console.log(this.state)
    const clients= this.context.users.map((user, index)=>{
        const expandedClassName = this.state.expandedIndex === index ? 'expanded' : ''
        const clientDetails= 
        <section key={user.id}>
            <button className='collapsible' onClick={()=> {this.toggle(index)}}>{user.full_name}
            
           </button>
          
        
 <div className={`button-content ${expandedClassName}`}>
     <p><em>Name:</em>{user.full_name}</p>
     <p><em>Email :</em>{user.email}</p>
     <p><em>Phone :</em>{user.phone}</p>
 

</div>

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