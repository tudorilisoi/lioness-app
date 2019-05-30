import React, {Component} from 'react';
import NavBar from '../Nav/Nav';
import Project from '../Projects/Project'
import ProjectSearchBar from './ProjectSearchBar'
export default class ProjectPage extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <ProjectSearchBar/>
                <Project/>
            </div>
        )
    }
}