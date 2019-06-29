import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AsyncSelect from "react-select/async";
import ds from '../../STORE/dataservice';
const { getUsers } = ds

const mapUsersToOptions = users =>
    users.map(u => { return { value: u.id, label: u.full_name } })
        .sort((a, b) => a.label.localeCompare(b.label))

export default class UserSelector extends Component {
    static propTypes = {
        defaultValue: PropTypes.object, //an user object or an users array
        roleFilter: PropTypes.any, //a role ID
        onChange: PropTypes.func,
        multiple: PropTypes.bool,
        renderFn: PropTypes.any, //if this is provided we will use it as a render() return value
    }
    constructor(props) {
        super(props)
        const { defaultValue, multiple } = this.props
        const valueAsArray = multiple ? [...defaultValue] : [defaultValue]
        const value = mapUsersToOptions(valueAsArray)
        this.state = {
            users: [],
            selected: value,
        }
        this.cache = valueAsArray //keep all the loaded users here so we can map back to users
    }
    onChange = (value) => {
        this.setState({ selected: value }, () => {
            const { onChange, multiple } = this.props
            const { selected } = this.state
            const selArr = !multiple ? [selected] : selected
            // debugger
            const selectedUsers = this.cache.filter(u => {
                const isSelected = !selArr ? false : selArr.find(i => i.value === u.id)
                return isSelected
            })
           
            onChange(!multiple ? selectedUsers[0] : selectedUsers)
        })
    }

    render() {
        const { roleFilter, multiple, renderFn } = this.props

        //a placeholder function to display, for example, a non-editable version of the input
        if (renderFn) {
            return renderFn()
        }

        // const value = mapUsersToOptions(multiple ? defaultValue : [defaultValue])
        const loadUsersPromise = inputValue => {
            const opts = {
                //TODO does not sort, though, why?
                userNameSort: true,
                roleFilter,
                searchQuery: inputValue
            }

            return getUsers(opts).then(response => {
               
                this.cache = [...this.cache, ...response.data]
                function onlyUnique(item, index, self) {
                    return self.findIndex(i => i.id === item.id) === index;
                }
                this.cache = this.cache.filter(onlyUnique)
               
                return mapUsersToOptions(response.data)
            })
        }
        const props = {
            onChange: this.onChange,
            isMulti: multiple,
            defaultOptions: true,
            value: this.state.selected,
            loadOptions: loadUsersPromise,
        }
        // debugger
        return (
            <AsyncSelect {...props} />
        )
    }

}