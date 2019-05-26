import React, { Component } from "react";
import "./LoginForm.css";
import LionessContext from "../../LionessContext/LionessContext";
export default class LoginForm extends Component {
  static contextType = LionessContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailValid: false,
      passwordValid: false,
      formValid: null,
      validationMessages: {
        email: "",
        password: ""
      }
    };
  }
  emailChanged(email) {
    this.setState({ email });
  }
  passwordChanged(password) {
    this.setState({ password });
  }
  validateLoginEmail(fieldValue){
      const fieldErrors = {...this.state.validationMessages 
}
let hasError= false;
fieldValue = fieldValue.trim();
if(fieldValue.length===0){
    fieldErrors.email= "Login email is required";
    hasError= true;
}
const userEmails=this.context.users.find(user=>user.email===this.state.email)
if(!userEmails){
    fieldErrors.email= "Email does not match ay users"
    hasError= true;
}else{
    fieldErrors.email="";
    hasError =false;
}
this.setState(
    {
        validationMessages:fieldErrors,
        emailValid:!hasError
    },
    this.formValid
)
  }
  validateLoginPassword(fieldValue){
    const fieldErrors = {...this.state.validationMessages 
}
let hasError= false;
fieldValue = fieldValue.trim();
if(fieldValue.length===0){
  fieldErrors.password= "Login password is required";
  hasError= true;
}
const userPasswords =this.context.users.find(user=>user.password===this.state.password)
if(!userPasswords){
  fieldErrors.email= "Password does not match any users"
  hasError= true;
}else{
  fieldErrors.email="";
  hasError =false;
}
this.setState(
  {
      validationMessages:fieldErrors,
     passwordValid:!hasError
  },
  this.formValid
)
}
  render() {
    //   const testEmail= "Chris8@yahoo.com"
    // const userEmails=this.context.users.find(user=>user.email===testEmail)

    return (
      <div className="LoginForm-Container">
        <h2>Login</h2>
        <form className="LoginForm">
          <label htmlFor="email"> Email:</label>
          <input
            type="text"
            id="email"
            onChange={e => this.emailChanged(e.target.value)}
          />
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            id="password"
            onChange={e => this.passwordChanged(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
