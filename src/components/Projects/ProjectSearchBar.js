import React, {Component} from 'react'
import './ProjectSearchBar.css'
import ds from '../../STORE/dataservice';
import LionessContext from '../../LionessContext/LionessContext';
const {getProjects, statuses}= ds
export default class ProjectSearchBar extends Component{
static contextType= LionessContext
constructor(){
    super()
    this.state={
        statusFilter: null,
        budgetSortAsc:null,
    }
}
statusChange=(status)=>{
    this.setState({
        statusFilter: status
    })
} 


budgetChange=(sortType)=>{
    if(sortType==='asc'){
        this.setState({
            budgetSortAsc: true,
        })
    }else{
        this.setState({
            budgetSortAsc:false
        })
    }


}
    //TODO keep all the filters and sorting opts in the state
    
    // const opts = {
    //     statusFilter:this.state.statusFilter,
    // }
    // getProjects(opts)
    // .then(res=>{
    //     this.context.setProjects(res)
    // })


    
handleSubmit=(e)=>{
    e.preventDefault()
    const opts = {
        statusFilter:this.state.statusFilter,
        budgetFilterAsending: this.state.budgetSortAsc
    }
    getProjects(opts)
    .then(res=>{
        this.context.setProjects(res)
    })
}

render(){
//     console.log(this.state)
//         const statusOptions= statuses.map((status, i)=>{
// return <option key={i} value={status}>{status}</option>
//         }
//             )
        
        return(
            <div className='searchBar'>
        <form onSubmit={e => this.handleSubmit(e)}>
       <label htmlFor='search'> Search</label>
       <input type='text' id='search' name='search'/>
       <button type='submit'>Search! </button>
       {/* <label htmlFor='search'>Showing</label>
         <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'
         onChange={e=>this.statusChange(e.target.value)}>
            <option value="allProjects">All Projects</option>
                    {statusOptions}
            </select> */}
          Filter by:
          <label htmlFor='budgetSort'>Budget</label>
          <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'
          onChange={e=>this.budgetChange(e.target.value)}>
              <option value=''defaultValue>Choose One</option>
            <option value='asc'defaultValue>high to low</option>
            <option value='des'>low to high</option>
            </select>
            <label htmlFor='sort'>Date</label>
          <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'>
          <option>Start Date</option>
            <option>Estimated Due Date</option>
            <option>Completion Date</option>
            </select>
            <label for="start">Start date:</label>

<input type="text" id="start" name="trip-start"
       value=""
       min="2018-01-01" max="2018-12-31"></input>
            <button
          type="submit"
          className="submitProjectFilters"
        >Submit</button>
</form>
            </div>
        )
    }
}