import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class DataLoader extends Component{
    static propTypes = {
        // url: PropTypes.string.isRequired,
        onDataLoaded: PropTypes.func.isRequired,
        onBeforeFetch: PropTypes.func,
    }
constructor(props){
    super(props);
    this.state={
        error: false,
        
    }
}

componentDidMount(){
    if(this.props.onBeforeFetch){
        this.props.onBeforeFetch(this.props.url)
    }
    //this.props.url is a mock API made from a function that creates a response in fakerdata.js
    this.props.url
    .then(resJson=>{
        this.props.onDataLoaded(resJson)
    }).catch(error=>{
        this.setState({error})
    })
}
render(){
    const {error} = this.state
    if(error){
        throw error
    }
    return null
}

}