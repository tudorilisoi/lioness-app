import React, { Component } from "react";
import {GetProjects} from '../STORE/fakerdata'
export default class DataLoader extends Component{

constructor(props){
    super(props);
    this.state={
        error: false,
        projects: []
    }
}

componentDidMount(){
    GetProjects()
    
    .then(resJson=>{
        this.setState({projects:resJson})
    })
}
render(){
    return(
        <div>
            hi!
        </div>
    )
}

}