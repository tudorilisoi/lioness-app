import React from 'react'
import ds from '../STORE/dataservice'
const LionessContext = React.createContext(
    {
        projects: ds.defaultProjectData,
        users: [],
        roles:[],
      statuses:[],
        currentUser: null,
        viewProjectStatus: null,
        viewProjectStatusLoaded: false,
        projectsLoaded: false,
        usersLoaded: false,
        rolesLoaded:false,
      statusesLoaded:false,
        currentUserLoaded: false,
        history: {},
        setCurrentUser: () => {

        },
        setUsers: () => {

        },
        setRoles: () => {

        },
        setStatuses: () => {

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