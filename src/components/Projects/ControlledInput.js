import React from 'react'
import PropTypes from 'prop-types'

export default class ControlledInput extends React.Component {

    static propTypes = {
        editMode: PropTypes.bool,
        initialValue: PropTypes.any,
        tag: PropTypes.any,
    }

    constructor(props) {
        super(props)
        this.state = { value: props.initialValue || '' }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps.initialValue, this.props.initialValue)
        if (prevProps.initialValue !== this.props.initialValue) {
            this.setState({ value: this.props.initialValue || '' })
        }
    }

    onChange = (ev) => {
        ev.preventDefault()
        const { value } = ev.target
        this.setState({
            value
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value)
            }
        })
    }

    render() {
        if (!this.props.editMode) {
            return <span>{this.state.value}</span>
        }
        const { editMode, initialValue, tag, onChange,required, ...rest } = this.props
        // console.log('value', initialValue)
     
        const props = {
            ...rest,
            onChange: this.onChange,
            value: this.state.value,
            required,
            
        }
        return React.createElement(tag, props)
    }
}