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
        budgetSortAsc:null,
    }
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

    
handleSubmit=(e)=>{
    e.preventDefault()
    const opts = {
        budgetFilterAsending: this.state.budgetSortAsc
    }
    getProjects(opts)
    .then(res=>{
        this.context.setProjects(res)
    })
}

render(){
    const dateTypes=  ()=>{
       return <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'>
     <option>Start Date</option>
    {this.props.status ==='in progress'|| this.props.status === 'billed' ? <option>Estimated Due Date</option> : ''}
    {this.props.status === 'billed' ? <option>Completion Date</option> : ''}
    </select>
}
        return(
            <div className='searchBar'>
        <form onSubmit={e => this.handleSubmit(e)}>
       <label htmlFor='search'> Search</label>
       <input type='text' id='search' name='search'/>
       <button type='submit'>Search! </button>
          Filter by:
          <label htmlFor='sort'>Type of Date</label>
          {dateTypes()} 
            <label htmlFor='sort'>Time Period</label>
            <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'>
            <option>All</option>
          <option>Before</option>
          <option>After</option>
            <option>Between Dates</option>
            </select>
            <label htmlFor='date'></label>
            <input type="date"></input>
          <label htmlFor='budgetSort'>Budget</label>
          <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'
          onChange={e=>this.budgetChange(e.target.value)}>
              <option value=''defaultValue>Choose One</option>
            <option value='asc'defaultValue>high to low</option>
            <option value='des'>low to high</option>
            </select>
            <label htmlFor='dateSort'>Date</label>
            <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'>
              <option value=''defaultValue>Choose One</option>
            <option value='asc'defaultValue>high to low</option>
            <option value='des'>low to high</option>
            </select>
            <button
          type="submit"
          className="submitProjectFilters"
        >Submit</button>
</form>
            </div>
        )
    }
}