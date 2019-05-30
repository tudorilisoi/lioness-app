import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class DataLoader extends Component {
    static propTypes = {
        url: PropTypes.string,
        onDataLoaded: PropTypes.func.isRequired,
        promise: PropTypes.object,
        onReject:PropTypes.func,
        onBeforeFetch: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            error: false,

        }
    }

    componentDidMount() {
        const { url, promise, onBeforeFetch, onDataLoaded, onReject } = this.props
        if(promise && url){
            throw new Error('do not pass a promise and an URL at the same time')
        }
        if (onBeforeFetch) {
            onBeforeFetch(url)
        }
        const p = url ? fetch(url) : promise
        //this.props.url is a mock API made from a function that creates a response in fakerdata.js
        p
            .then(resJson => {
                onDataLoaded(resJson)
            }).catch(error => {
                // debugger
                onReject(error)
                // this.setState({ error })
                // return false
            })
    }
    render() {
        // const { error } = this.state
        // if (error) {
        //     throw error
        // }
        return null
    }

}