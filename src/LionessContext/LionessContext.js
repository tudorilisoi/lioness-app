import React from 'react'
const LionessContext =React.createContext(
    {
        projects:[],
        users:[],
        currentUser: null,
        viewProjectStatus: null,
        viewProjectStatusLoaded: false,
        projectsLoaded: false,
        usersLoaded:false,
        currentUserLoaded: false,
        history:{},
        setCurrentUser: () =>{

        },
        setUsers: () =>{

        },
        setProjects: () =>{

        },
        beforeProjectFetch: ()=>{

        },
        beforeUserFetch: () =>{

        },
        setViewProjectStatus: ()=>{

        },
    }
)
export default LionessContext;