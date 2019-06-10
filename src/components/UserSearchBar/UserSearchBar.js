import React, { Component } from "react";
import "../Projects/ProjectSearchBar.css";
import ds from "../../STORE/dataservice";
import LionessContext from "../../LionessContext/LionessContext";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
const { getUsers, statuses } = ds;
export default class UserSearchBar extends Component {
  static contextType = LionessContext;
  constructor() {
    super();
    this.state = {
      nameSort:null,
      currentPageNumber: 1,
      totalPages:null,
    };
  }

  changePage = (pageNum) => {
    if (pageNum === "prev" && this.state.currentPageNumber > 1) {
      this.setState({
        currentPageNumber: this.state.currentPageNumber - 1
      }, ()=>{this.fetchData()});
    }
    if (pageNum === "next") {
      this.setState({
        currentPageNumber:this.state.currentPageNumber + 1
      }, ()=>{this.fetchData()});
    }
    

  };
  
  fetchData=()=>{
      
    const opts = {
        nameSort:this.state.nameSort,
    };
    getUsers(opts).then(res => {
      console.log(res)
      
        this.context.setUsers(res);

    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.fetchData();
  }


  render() {
      
    const dateTypes = () => {
      return (
        <select
          className="sortResults"
          id="sortResults"
          name="sortResults-dropdown"
          aria-label="dropdown menu of sort options for results"
          onChange={e => this.dateTypeChange(e.target.value)}
        >
         <option selected disabled="">Choose One</option>
          <option value="startDate">Start Date</option>
          {this.props.status === "in progress" ||
          this.props.status === "billed" ? (
            <option value="estimatedDueDate">Estimated Due Date</option>
          ) : (
            ""
          )}
          {this.props.status === "billed" ? (
            <option value="completionDate">Completion Date</option>
          ) : (
            ""
          )}
        </select>
      );
    };
    console.log(this.state)
    return (
      <div className="searchBar">
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="search"> Search</label>
          <input type="text" id="search" name="search" />
          <button type="submit">Search! </button>
    Filter By:
          <label htmlFor="sort">Type of Date</label>
          {dateTypes()}
        
          <div className='dates'>
          <label htmlFor="date">After</label>
          <input
            type="date"
            onChange={e => this.afterDateChange(e.target.value)}
          />
          <label htmlFor="date">Before</label>
          <input
            type="date"
            onChange={e => this.beforeDateChange(e.target.value)}
          />
         </div>
          <button type="submit" className="submitProjectFilters">
            Submit
          </button>
          Sort by:
          <div className="sort-buttons">
            <button
              type="button"
              name="date-new"
              value="asc"
              onClick={e => this.dateSortChange(e.target.value)}
            >
              Date (Newest)
            </button>
            <button
              type="button"
              name="date-old"
              value="des"
              onClick={e => this.dateSortChange(e.target.value)}
            >
              Date (Oldest)
            </button>
            <button
              type="button"
              name="budget-high"
              value="asc"
              onClick={e => this.budgetChange(e.target.value)}
            >
              Budget (Highest)
            </button>
            <button
              type="button"
              name="budget-low"
              value="des"
              onClick={e => this.budgetChange(e.target.value)}
            >
              Budget (Lowest)
            </button>
          </div>
        </form>
        <button value="prev"onClick={e=>this.changePage(e.target.value)}>Previous</button>
        <button value="next"onClick={e=>this.changePage(e.target.value)}>Next</button>
      </div>
    );
  }
}
