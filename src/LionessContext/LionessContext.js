import React from 'react'
const LionessContext =React.createContext(
    {
        projects:[],
        users:[],
        projectsLoaded: false,
        usersLoaded:false,
        history:{}
    }
)
export default LionessContext;