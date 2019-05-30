import React, {Component} from 'react'
import './ProjectSearchBar.css'
import ds from '../../STORE/dataservice';
import LionessContext from '../../LionessContext/LionessContext';
const {getProjects, statuses}= ds
export default class ProjectSearchBar extends Component{
static contextType= LionessContext
statusChange=(status)=>{
    const opts = {
        statusFilter:status,
    }
    getProjects(opts)
    .then(res=>{
        this.context.setProjects(res)
    })
}   
    


render(){
        // const status=[...this.context.projects].map(project=>{
        //     return project.status
        // }) 
        // const uniqueStatus= status.filter((item, index)=>{
        //     return status.indexOf(item) >= index;
        // })
        const statusOptions= statuses.map((status, i)=>{
return <option key={i} value={status}>{status}</option>
        }
            )
        
        return(
            <div className='searchBar'>
        <form>
       <label htmlFor='search'> Search</label>
       <input type='text' id='search' name='search'/>
       <button type='submit'>Search! </button>
       <label htmlFor='search'>Showing</label>
         <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'
         onChange={e=>this.statusChange(e.target.value)}>
            <option value="allProjects">All Projects</option>
                    {statusOptions}
            </select>
          Filter by:
          <label htmlFor='budgetSort'>Budget</label>
          <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'>
            <option>high to low</option>
            <option>low to high</option>
            </select>
            <label htmlFor='sort'>Date</label>
          <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'>
            <option>Ascending</option>
            <option>Descending</option>
            </select>
</form>
            </div>
        )
    }
}