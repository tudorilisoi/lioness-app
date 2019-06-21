// import { GetProjects, GetUsers } from "./STORE/fakerdata";
const ADMIN_ROLE = 1
const CLIENT_ROLE = 2
const CONTRACTOR_ROLE = 3
const MANAGER_ROLE = 4

module.exports =  {
    API_URL: 'http://localhost:3000',
    ROLES: {
        ADMIN_ROLE,
        CLIENT_ROLE,
        CONTRACTOR_ROLE,
        MANAGER_ROLE,
    },
    // TEST_PROJECTS: GetProjects(),
    // TEST_USERS: GetUsers()
}