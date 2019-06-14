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
function dateFromInput(dateString) {
  // return dayjs(dateString).format('YYYY-MM-DD')
  return new Date(dateString).toUTCString();
}
const { getStatuses, getUsers } = ds;

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
        startDate: '',
        budget: '',
        estimatedDueDate: '',
        client: '',
        projectManager: '',
        contractors: ''


      }

    };
    "startDate completionDate estimatedDueDate"
      .split(" ")
      .forEach(i => (this.state[i] = dateForInput(this.state[i])));
  }

  onChange = (fieldName, value) => {
    this.validateField(fieldName, value);
    const changedProject = { ...this.state.project, [fieldName]: value }
    this.setState(
      changedProject,
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

  renderNonEdit() {
    const {
      title,
      status,
      id,
      description,
      startDate,
      budget,
      estimatedDueDate,
      client,
      projectManager,
      contractors,
      completionDate,
    } = this.state.project; //   //destructure the project since we're not spreading it in the astate anymore
    const formattedStartDate = dateForInput(startDate);
    return (
      <div className={'padded'}>
        <div className={''}>
          XXX
        </div>
      </div>
    )

  }

  render() {
    const {
      title,
      status,
      id,
      description,
      startDate,
      budget,
      estimatedDueDate,
      client,
      projectManager,
      contractors,
      completionDate,
    } = this.state.project; //   //destructure the project since we're not spreading it in the astate anymore
    const formattedStartDate = dateForInput(startDate);

    // const jsStartDate = dateToJS(startDateString)
    // debugger
    const { editMode } = this.props;
    // if(!editMode){
    //   return this.renderNonEdit()
    // }

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
      <div>
        <form>
          <div>
            <span>Status:</span>
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
          </div>
          <div>
            <span>Client:</span>
            {!editMode ? (
              client.full_name
            ) : (
                <UserSelector
                  onChange={value => this.onChange("client", [value])}
                  multiple={false} defaultValue={client} roleFilter={2} />
              )}
          </div>
          <div>
            <span>Project Manager:</span>
            {!editMode ? (
              projectManager.full_name
            ) : (
                <UserSelector
                  onChange={value => this.onChange("projectManager", [value])}
                  multiple={false} defaultValue={projectManager} roleFilter={4} />
              )}
          </div>
          <div>
            <span>Contractors:</span>
            {!editMode ? (
              currentContractorNames
            ) : (
                <UserSelector
                  onChange={value => this.onChange("contractors", [value])}
                  multiple={true} defaultValue={contractors} roleFilter={3}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />

              )}
          </div>
          <p>
            <span>Title:</span>
            <ControlledInput
              onChange={value => this.onChange("title", value)}
              tag="input"
              required={true}
              initialValue={title}
              editMode={editMode}
            />
          </p>
          <p>
            <span>Description :</span>
            <ControlledInput
              onChange={value => this.onChange("description", value)}
              tag="input"
              required={true}
              initialValue={description}
              editMode={editMode}
            />
          </p>
          <p>
            <span>Start Date :</span>
            <ControlledInput
              onChange={value => this.onChange("startDate", value)}
              tag="input"
              type="date"
              required={true}
              initialValue={dateForInput(startDate)}
              editMode={editMode}
            />
          </p>
          <p className={status.id === 2 || status.id === 3 ? 'show' : 'hide'}>
            <span>Estimated Due Date :</span>
            <ControlledInput
              onChange={value => this.onChange("estimatedDueDate", value)}
              tag="input"
              type="date"
              required={true}
              initialValue={
                estimatedDueDate === "Invalid Date" ? "" : estimatedDueDate
              }
              editMode={editMode}
            />
          </p>
          {status.id === 3 ? <p>
            <span>Completion Date :</span>
            <ControlledInput
              onChange={value => this.onChange("estimatedDueDate", value)}
              tag="input"
              type="date"
              required={true}
              initialValue={
                completionDate === "Invalid Date" ? "" : completionDate
              }
              editMode={editMode}
            />
          </p> : ''}
          <p>
            <span>Budget: :</span>
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
