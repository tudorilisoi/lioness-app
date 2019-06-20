import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import UserSelector from "../UserSelector/UserSelector";
import dayjs from "dayjs";
import ds from "../../STORE/dataservice";

// see https://react-select.com/home#getting-started
import Select from "react-select";
import LionessContext from "../../LionessContext/LionessContext";

function dateForInput(dateString) {
  return dayjs(dateString).format("YYYY-MM-DD");
}
// function dateFromInput(dateString) {
//   // return dayjs(dateString).format('YYYY-MM-DD')
//   return new Date(dateString).toUTCString();
// }
// const { getStatuses, getUsers } = ds;

export default class EditProject extends Component {
  static contextType = LionessContext;
  constructor(props) {
    super(props);
    const { project } = this.props;
    this.state = {
      project,
      validationMessages: {
        title: '',
        status: '',
        description: '',
        start_date: '',
        budget: '',
        estimated_due_date: '',
        client: '',
        manager: '',
        contractors: ''
      }

    };
    this.state.project.start_date = dateForInput(this.state.project.start_date || new Date())
  }

  onChange = (fieldName, value) => {
    this.validateField(fieldName, value);
    const changedProject = { ...this.state.project, [fieldName]: value }
    if ('status client manager'.split(' ').includes(fieldName)) {
      changedProject[`${fieldName}_id`] = value.id
    }
    this.setState(
      { project: changedProject },
      () => {
        console.log("EDIT STATE", this.state);
      }
    );
  };

  validateField = (fieldName, value) => {
    console.log(`validating "${fieldName}" against the value of: ${value}`);

    switch (fieldName) {
      case "title":
        if (value === '')
          this.setState({
            validationMessages: {
              title: 'Title can not be empty'
            }
          })
        break;
      case "description":
        this.setState({
          validationMessages: {
            description: 'Description can not be empty'
          }
        })
        //TODO setState with proper validation messages
        break;

      default:
        break;
    }
  };

  save() {
    const { client, manager, contractors, status, ...rawProject } = this.state.project
    const data = {
      project: rawProject,
      contractorIDs: contractors.map(c => c.id),
    }
    console.log(`Saving project:`, data)
    return ds.saveProject(data)
  }

  render() {
    const {
      title,
      status,
      description,
      start_date,
      budget,
      estimated_due_date,
      client,
      manager,
      contractors,
      completion_date,
    } = this.state.project; //destructure the project

    // const jsStartDate = dateToJS(startDateString)
    // debugger
    const { editMode } = this.props;


    // TODO pass statuses as a property
    // Do NOT use context any level deep, just on the *Page components
    // this is now broken

    const statusesOpts = this.context.statuses.map(status => {
      const options = { value: status.id, label: status.title };
      // { value: 'strawberry', label: 'Strawberry' },
      // { value: 'vanilla', label: 'Vanilla' }

      return options;
    });
    const prevStatus = statusesOpts.find(
      s => s.value === status.id
    );

    let currentContractorNames = contractors.map(contractor => {
      return contractor.full_name;
    }).join(", ");
    return (
      <div className='details'>
        <form>
          <p>
            <span>Title: </span>
            <ControlledInput
              onChange={value => this.onChange("title", value)}
              tag="input"
              required={true}
              initialValue={title}
              editMode={editMode}
            />
          </p>

          <p>
            <span>Status: </span>
            {!editMode ? (
              status.title
            ) : (
                <Select
                  options={statusesOpts}
                  defaultValue={prevStatus}
                  onChange={option => this.onChange("status",
                    this.context.statuses.find(i => i.id === option.value))}
                />
              )}
          </p>

          <p>
            <span>Description: </span>
            <ControlledInput
              onChange={value => this.onChange("description", value)}
              tag="textarea"
              required={true}
              initialValue={description}
              editMode={editMode}
              rows={10}
            />
          </p>

          <p>
            <span>Client: </span>
            {!editMode ? (
              client.full_name
            ) : (
                <UserSelector
                  onChange={value => this.onChange("client", value)}
                  multiple={false} defaultValue={client} roleFilter={2} />
              )}
          </p>


          <p>
            <span>Project Manager: </span>
            {!editMode ? (
              manager.full_name
            ) : (
                <UserSelector
                  onChange={value => this.onChange("manager", value)}
                  multiple={false} defaultValue={manager} roleFilter={4} />
              )}
          </p>


          <p>
            <span>Contractors: </span>
            {!editMode ? (
              currentContractorNames
            ) : (
                <UserSelector
                  onChange={value => this.onChange("contractors", value)}
                  multiple={true} defaultValue={contractors} roleFilter={3}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />

              )}
          </p>


          <p>
            <span>Start Date: </span>
            <ControlledInput
              onChange={value => this.onChange("start_date", value)}
              tag="input"
              type="date"
              required={true}
              initialValue={dateForInput(start_date)}
              editMode={editMode}
            />
          </p>

          <p className={status.id === 2 || status.id === 3 ? 'show' : 'hide'}>
            <span>Estimated Due Date: </span>
            <ControlledInput
              onChange={value => this.onChange("estimated_due_date", value)}
              tag="input"
              type="date"
              required={true}
              initialValue={
                estimated_due_date === "Invalid Date" ? "" : dateForInput(estimated_due_date)
              }
              editMode={editMode}
            />
          </p>

          {status.id === 3 ? <p>
            <span>Completion Date: </span>
            <ControlledInput
              onChange={value => this.onChange("estimated_due_date", value)}
              tag="input"
              type="date"
              required={true}
              initialValue={
                completion_date === "Invalid Date" ? "" : dateForInput(completion_date)
              }
              editMode={editMode}
            />
          </p> : ''}
          <p>
            <span>Budget: </span>
            <ControlledInput
              onChange={value => this.onChange("budget", value)}
              tag="input"
              type="number"
              required={true}
              initialValue={budget}
              editMode={editMode}
            />
          </p>

        </form>

      </div>
    );
  }
}
