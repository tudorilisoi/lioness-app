import React from 'react'
import ds from '../STORE/dataservice'
const LionessContext = React.createContext(
    {
        projects: ds.defaultProjectData,
        users: [],
        currentUser: null,
        viewProjectStatus: null,
        viewProjectStatusLoaded: false,
        projectsLoaded: false,
        usersLoaded: false,
        currentUserLoaded: false,
        history: {},
        setCurrentUser: () => {

        },
        setUsers: () => {

        },
        setProjects: () => {

        },
        beforeProjectFetch: () => {

        },
        beforeUserFetch: () => {

        },
        setViewProjectStatus: () => {

        },
    }
)
export default LionessContext;