import React, { Component } from 'react'
import ControlledInput from './ControlledInput'
import dayjs from 'dayjs'

// see https://react-select.com/home#getting-started
import Select from 'react-select'
import LionessContext from '../../LionessContext/LionessContext';

function dateForInput(dateString) {
    return dayjs(dateString).format('YYYY-MM-DD')
}
function dateFromInput(dateString) {
    // return dayjs(dateString).format('YYYY-MM-DD')
    return new Date(dateString).toUTCString()
}


export default class EditProject extends Component {
    static contextType=LionessContext;
    constructor(props) {
        super(props)
        const { project } = this.props
        this.state = {
            ...project
        }
        'startDate completionDate estimatedDueDate'.split(' ').forEach(
            i => this.state[i] = dateForInput(this.state[i])
        )
    }

    onChange = (fieldName, value) => {
        this.validateField(fieldName, value)

        this.setState({
            [fieldName]: value
        }, () => {
            console.log('EDIT STATE', this.state)
        })
    }

    validateField = (fieldName, value) => {
        console.log(`validating "${fieldName}" against the value of: ${value}`)
        switch (fieldName) {
            case 'title':
            case 'description':
                //TODO setState with proper validation messages
                break;

            default:
                break;
        }
    }


    render() {
        
        const { title, status, id, description, startDate, budget } = this.state
        const formattedStartDate = dateForInput(startDate)
        console.log(`edit form`, this.state)
        console.log(`hello context`, this.context.statuses)

        // const jsStartDate = dateToJS(startDateString)
        // debugger
        const { editMode } = this.props

        
     const statusesOpts= this.context.statuses.map(status=>{
        const options = 
        
            { value: status.id, label: status.title }
            // { value: 'strawberry', label: 'Strawberry' },
            // { value: 'vanilla', label: 'Vanilla' }
        
        return options
     })
        
console.log(`hello status opts`,statusesOpts)
    

        return (
            <form>
                <div><span>Status:</span>{!editMode ? status.title : (
                    <Select
                        options={statusesOpts}
                        defaultValue={statusesOpts[0]}
                        onChange={value => this.onChange('status', value)}
                    />
                )}</div>

                <p><span>Title:</span><ControlledInput
                    onChange={value => this.onChange('title', value)}
                    tag='input'
                    initialValue={title} editMode={editMode}
                /></p>
                <p><span>Description :</span><ControlledInput
                    onChange={value => this.onChange('description', value)}
                    tag='input'
                    initialValue={description} editMode={editMode}
                /></p>
                <p><span>Start Date :</span><ControlledInput
                    onChange={value => this.onChange('startDate', value)}
                    tag='input'
                    type='date'
                    initialValue={startDate} editMode={editMode}
                /></p>
                <p><span>Budget: :</span><ControlledInput
                    onChange={value => this.onChange('budget', value)}
                    tag='input'
                    type='number'
                    initialValue={budget} editMode={editMode}
                /></p>


            </form>
        )
    }
}