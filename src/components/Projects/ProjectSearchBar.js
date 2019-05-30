import React, {Component} from 'react'
import './ProjectSearchBar.css'
import ds from '../../STORE/dataservice';
import LionessContext from '../../LionessContext/LionessContext';
const {statusFilter}= ds
export default class ProjectSearchBar extends Component{
static contextType= LionessContext
statusChange=(status)=>{
    statusFilter(status)
    .then(res=>{
        this.context.setProjects(res)
    })
}   
    


render(){
        const status=[...this.context.projects].map(project=>{
            return project.status
        }) 
        const uniqueStatus= status.filter((item, index)=>{
            return status.indexOf(item) >= index;
        })
        const statusOptions= uniqueStatus.map((status, i)=>{
return <option key={i} value={status}>{status}</option>
        }
            )
        console.log(uniqueStatus)
        return(
            <div className='searchBar'>
        <form>
       <label for='search'> Search</label>
       <input type='text' id='search' name='search'/>
       <button type='submit'>Search! </button>
       <label for='search'>Showing</label>
         <select class='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'
         onChange={e=>this.statusChange(e.target.value)}>
            <option value="allProjects">All Projects</option>
                    {statusOptions}
            </select>
          Filter by:
          <label for ='budgetSort'>Budget</label>
          <select class='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'>
            <option>high to low</option>
            <option>low to high</option>
            </select>
            <label for ='sort'>Date</label>
          <select class='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'>
            <option>Ascending</option>
            <option>Descending</option>
            </select>
</form>
            </div>
        )
    }
}