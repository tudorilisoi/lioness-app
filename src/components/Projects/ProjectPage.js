import React, {Component} from 'react';
import NavBar from '../Nav/Nav';
import Project from '../Projects/Project'

export default class ProjectPage extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <Project/>
            </div>
        )
    }
}