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
        dateTypeFilter:null,
        timePeriodFilter:null,
        dateSortAsc:null,
        dateOne:null,
        dateTwo:null,
        
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
dateTypeChange=(dateType)=>{
    this.setState({dateTypeFilter: dateType})
}
timePeriodChange=(timePeriod)=>{
    this.setState({timePeriodFilter: timePeriod})
}
dateSortChange(dateSort){
    if(dateSort==='asc'){
        this.setState({
            dateSortAsc: true,
        })
    }else{
        this.setState({
            dateSortAsc:false
        })
    }
}
dateOneChange(date){
    this.setState({dateOne:date})
}
dateTwoChange(date){
    this.setState({dateTwo:date})
}
handleSubmit=(e)=>{
    e.preventDefault()
    const opts = {
        budgetFilterAsending: this.state.budgetSortAsc,
        dateTypeFilter:this.state.dateTypeFilter,
        timePeriodFilter:this.state.timePeriodFilter,
        dateSortAsc:this.state.dateSortAsc,
        dateOne:this.state.dateOne,
        dateTwo:this.state.dateTwo,
        statusFilter:this.props.status
    }
    getProjects(opts)
    .then(res=>{
        this.context.setProjects(res)
    })
}

render(){
    const dateTypes=  ()=>{
       return <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'
       onChange={e=>this.dateTypeChange(e.target.value)}>
           <option value= ''selected disabled>Choose One</option>
     <option value ='startDate'>Start Date</option>
    {this.props.status ==='in progress'|| this.props.status === 'billed' ? <option value='estimatedDueDate'>Estimated Due Date</option> : ''}
    {this.props.status === 'billed' ? <option value= 'completionDate'>Completion Date</option> : ''}
    </select>
}
console.log(`project searchbar state`, this.state)
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
            <select className='sortResults'id='sortResults'name='sortResults-dropdown'aria-label='dropdown menu of sort options for results'
            onChange={e=>this.timePeriodChange(e.target.value)}>
            <option value=''selected disabled>Choose One</option>
            <option value='all' defaultValue>All</option>
          <option value='before'>Before</option>
          <option value ='after'>After</option>
            <option value='betweenDates'>Between Dates</option>
            </select>
            <label htmlFor='date'>Date One</label>
            <input type="date"onChange={e=>this.dateOneChange(e.target.value)}></input>
            <label htmlFor='date'>Date Two</label>
            <input type="date"onChange={e=>this.dateTwoChange(e.target.value)}></input>
            Sort by:
            <button type='button' name='date-new' value="asc"onClick={e=>this.dateSortChange(e.target.value)}>Date (Newest)</button>
            <button type='button' name='date-old' value="des"onClick={e=>this.dateSortChange(e.target.value)}>Date (Oldest)</button>
            <button type='button' name='budget-high' value="asc"onClick={e=>this.budgetChange(e.target.value)}>Budget (Highest)</button>
            <button type='button' name='budget-low' value="des"onClick={e=>this.budgetChange(e.target.value)}>Budget (Lowest)</button>
            <button
          type="submit"
          className="submitProjectFilters"
        >Submit</button>
</form>
            </div>
        )
    }
}