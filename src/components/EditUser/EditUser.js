import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import dayjs from "dayjs";
import ds from "../../STORE/dataservice";

// see https://react-select.com/home#getting-started
import Select from "react-select";
import LionessContext from "../../LionessContext/LionessContext";

const { getStatuses, getUsers } = ds;

export default class EditUser extends Component {
  static contextType = LionessContext;
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      ...user,

    };

  }

  onChange = (fieldName, value) => {
    this.validateField(fieldName, value);

    this.setState(
      {
        [fieldName]: value
      },
      () => {
        console.log("EDIT STATE", this.state);
      }
    );
  };

  validateField = (fieldName, value) => {
    console.log(`validating "${fieldName}" against the value of: ${value}`);

    switch (fieldName) {
      case "full_name":

      case "email":

        //TODO setState with proper validation messages
        break;

      default:
        break;
    }
  };
  save() {
    // pluck out the projects and the role
    const {projects, role, ...user} = {...this.state}

    const data = {
      user: user
    }
    console.log(`Saving project:`, data)
    return ds.saveUser(data)
  }
 
  render() {
    const {
      full_name,
      email,
      phone,
      id,
    } = this.state;

    const { editMode } = this.props;
    //TODO add a role dropdown (cutom component)
    return (
      <div className='details'>
        <form>
         <p>
            <span>Name</span>
            {!editMode ? (
              full_name
            ) : (
                <ControlledInput
                  onChange={value => this.onChange("full_name", value)}
                  tag="input"
                  required={true}
                  initialValue={full_name}
                  editMode={editMode}
                />
              )}
          </p>
          <p>
            <span>Email:</span>
            <ControlledInput
              onChange={value => this.onChange("email", value)}
              tag="input"
              required={true}
              initialValue={email}
              editMode={editMode}
            />
          </p>
          <p>
            <span>Phone:</span>
            <ControlledInput
              onChange={value => this.onChange("phone", value)}
              tag="input"
              required={true}
              initialValue={phone}
              editMode={editMode}
            />
          </p>

        </form>

      </div>
    );
  }
}
