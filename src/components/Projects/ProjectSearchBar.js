import React, { Component } from "react";
import "./ProjectSearchBar.css";
import ds from "../../STORE/dataservice";
import LionessContext from "../../LionessContext/LionessContext";
import { createStatement } from "typescript";
const { getProjects, statuses } = ds;
export default class ProjectSearchBar extends Component {
  static contextType = LionessContext;
  constructor() {
    super();
    this.state = {
      budgetSortAsc: null,
      dateTypeFilter: null,
      timePeriodFilter: null,
      dateSortAsc: null,
      dateOne: null,
      dateTwo: null,
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
  budgetChange = sortType => {
      
    if (sortType === "asc") {
      this.setState({
        budgetSortAsc: true,
        currentPageNumber:1
      }, ()=>{this.fetchData()});
    } else {
      this.setState({
        budgetSortAsc: false,
        currentPageNumber:1
      }, ()=>{this.fetchData()});
    }
  };
  dateTypeChange = dateType => {
      
    this.setState({ dateTypeFilter: dateType });
  };
  timePeriodChange = timePeriod => {
    this.setState({ timePeriodFilter: timePeriod });
  };
  dateSortChange(dateSort) {
      
    if (dateSort === "asc") {
      this.setState({
        dateSortAsc: true,
        currentPageNumber:1
      },()=>{console.log(`this is datesortChange true`,this.fetchData())} );
    } else {
      this.setState({
        dateSortAsc: false,
        currentPageNumber:1
      },()=>{console.log(`this is datesortChange false`,this.fetchData())});
    }
    
  }
  dateOneChange(date) {
    this.setState({ dateOne: date });
  }
  dateTwoChange(date) {
    this.setState({ dateTwo: date });
  }
  fetchData=()=>{
      
    const opts = {
      budgetFilterAsending: this.state.budgetSortAsc,
      dateTypeFilter: this.state.dateTypeFilter,
      timePeriodFilter: this.state.timePeriodFilter,
      dateSortAsc: this.state.dateSortAsc,
      dateOne: this.state.dateOne,
      dateTwo: this.state.dateTwo,
      statusFilter: this.props.status,
      pageNumber: this.state.currentPageNumber
    };
    getProjects(opts).then(res => {
      console.log(res)
        this.context.setProjects(res);

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
          <label htmlFor="sort">Time Period</label>
          <select
            className="sortResults"
            id="sortResults"
            name="sortResults-dropdown"
            aria-label="dropdown menu of sort options for results"
            onChange={e => this.timePeriodChange(e.target.value)}
          >
            <option value="" selected disabled>
              Choose One
            </option>
            <option value="all" defaultValue>
              All
            </option>
            <option value="before">Before</option>
            <option value="after">After</option>
            <option value="betweenDates">Between Dates</option>
          </select>
          <label htmlFor="date">Date One</label>
          <input
            type="date"
            onChange={e => this.dateOneChange(e.target.value)}
          />
          <label htmlFor="date">Date Two</label>
          <input
            type="date"
            onChange={e => this.dateTwoChange(e.target.value)}
          />
         
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
