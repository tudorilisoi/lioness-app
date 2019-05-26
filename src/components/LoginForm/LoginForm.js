import React, { Component } from "react";
import "./LoginForm.css";
import LionessContext from "../../LionessContext/LionessContext";
import ValidationErrors from '../ValidationErrors/ValidationErrors'
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
      emailValidationMessage:"",
      passwordValidationMessage:"",
    };
  }
  emailChanged(email) {
    this.setState({ email });
  }
  passwordChanged(password) {
    this.setState({ password });
  }
  validateLoginEmail(fieldValue){
      let fieldErrors = {...this.state.emailValidationMessage }
let hasError= false;
fieldValue = fieldValue.trim();
if(fieldValue.length === 0){
    fieldErrors= "Login email is required";
    hasError= true;
}
else{
const userEmails=this.context.users.find(user=>user.email===this.state.email)
if(!userEmails){
    fieldErrors= "Email does not match any users"
    hasError= true;
}else{
    fieldErrors= "";
    hasError = !hasError
    
}
}
this.setState(
    {
        emailValidationMessage:fieldErrors,
        emailValid: true
    },
    this.formValid
)
  }

  validateLoginPassword(fieldValue){
    let fieldErrors = {...this.state.passwordValidationMessage 
}
let hasError= false;
fieldValue = fieldValue.trim();
if(fieldValue.length===0){
  fieldErrors= "Login password is required";
  hasError= true;
}
else{
const userPasswords =this.context.users.find(user=>user.password===this.state.password)
if(!userPasswords){
  fieldErrors = "Password does not match any users"
  hasError= true;
}else{
  fieldErrors= "";
  hasError =false;
  console.log(userPasswords)
}
}
this.setState(
  {
    passwordValidationMessage:fieldErrors,
     passwordValid:!hasError
  },
  this.formValid
)
}
handleLoginSubmit(e){
    e.preventDefault();
    const {email, password} = this.state
this.validateLoginEmail(email);
this.validateLoginPassword(password);

}
  render() {
    //   const testEmail= "Chris8@yahoo.com"
    // const userEmails=this.context.users.find(user=>user.email===testEmail)

    return (
      <div className="LoginForm-Container">
        <h2>Login</h2>
        <form className="LoginForm"onSubmit={e=>this.handleLoginSubmit(e)}>
          <label htmlFor="email"> Email:</label>
          <input
            type="text"
            id="email"
            onChange={e => this.emailChanged(e.target.value)}
          />
          <ValidationErrors 
          hasError= {!this.state.emailValid}
          message={this.state.emailValidationMessage}
          />
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            id="password"
            onChange={e => this.passwordChanged(e.target.value)}
          />
          <ValidationErrors 
          hasError= {!this.state.passwordValid}
          message={this.state.passwordValidationMessage}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
