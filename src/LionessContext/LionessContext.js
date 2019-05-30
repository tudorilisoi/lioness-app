import React from 'react'
const LionessContext =React.createContext(
    {
        projects:[],
        users:[],
        currentUser: null,
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
    }
)
export default LionessContext;