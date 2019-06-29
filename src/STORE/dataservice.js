/* eslint-disable import/first */
import dayjs from 'dayjs';
import queryString from 'query-string'
import isBetween from 'dayjs/plugin/isBetween';
import fjs from 'flatted/cjs';
import Cookie from "js.cookie";
import { default as deterministicStringify } from 'json-stable-stringify';
import { history } from '../index';
import dataString from './flattenedData.json';
import{API_BASE_URL} from '../config'
dayjs.extend(isBetween)
const { parse, stringify } = fjs

let data = parse(JSON.stringify(dataString));

const SORT_ASC = 'ASC'
const SORT_DESC = 'DESC'

const STATUS_ESTIMATE = 1
const STATUS_IN_PROGRESS = 2
const STATUS_BILLED = 3
const STATUS_OTHER = 4

const projectsDefaultOptions = {
    statusFilter: null,
    searchQuery: null,
    budgetSort: SORT_DESC,
    dateTypeFilter: null,
    dateSort: null,
    afterDate: null,
    beforeDate: null,
    roleFilter: null,
    pageNumber: 1,
}
const usersDefaultOptions = {
    idsFilter: null, // pass a non-empty array to fetch users by theirs ids
    searchQuery: null,
    userNameSort: SORT_ASC,
    roleFilter: null,
    pageNumber: 1,
}

const NOT_LOGGED_IN = 'NOT_LOGGED_IN'
const ITEMS_PER_PAGE = 10

function delay(promiseObj, delayMillis = 1000) {
    return new Promise(resolve => {
        window.setTimeout(() => resolve(promiseObj), delayMillis)
    })
}

const addAuthTokenHeader = (headersObj = {}) => {
    let headers = headersObj || new Headers()
    const info = ds.getStoredLoginInfo()
    headers.Authorization = `Bearer ${info.authToken}`
    return headers
}


const ds = {
    STATUS_IDS: {
        STATUS_ESTIMATE,
        STATUS_IN_PROGRESS,
        STATUS_BILLED,
        STATUS_OTHER,
    },
    SORT_ASC,
    SORT_DESC,
    projectsDefaultOptions,
    usersDefaultOptions,

    /**
     * compares two circular data objects
     * 
     * useful for avoiding unnecessary state updates when using setProjects, setRoles, etc.
     * @param {Object} objOne 
     * @param Object} objTwo 
     */

    areObjectsDeepEqual(objOne, objTwo) {
        const flatOne = JSON.parse(stringify(objOne))
        const flatTwo = JSON.parse(stringify(objTwo))
        return deterministicStringify(flatOne) === deterministicStringify(flatTwo)
    },

    defaultProjectData: { data: [], numPages: 0, totalItemCount: 0 },
    defaultUserData: { data: [], numPages: 0, totalItemCount: 0 },

    // statuses: ["estimate", "in progress", "billed", "other"],

    handleFetchError: (err) => {
        // 
        if (err.message === NOT_LOGGED_IN) {
            console.log('redirecting to login')
            history.push('/login')
        }
    },
    getStoredLoginInfo: () => {
        return Cookie.get("jwt_info");
    },
    setStoredLoginInfo: (data) => {
        Cookie.set("jwt_info", data);
    },
    deleteStoredLoginInfo: () => {
        Cookie.remove("jwt_info");
    },
    loadCurrentUser: () => {
        const userInfo = ds.getStoredLoginInfo()
        if (!(userInfo && userInfo.userID)) {
            return Promise.reject(new Error('BAD_STORED_CREDENTIALS'))
        }
        return ds.getUsers({ idsFilter: [userInfo.userID] }).then(res => {
            if (!res.data.length) {
                return Promise.reject(new Error('BAD_STORED_CREDENTIALS'))
            }
            return res
        })
    },
    getRoles: (opts = {}) => {
        if (!ds.getStoredLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }

        return fetch(`${API_BASE_URL}/roles`, {
    
        })
            .then(r => r.json())
            .then(data => {
                
                return data
            })
    },
    getStatuses: (opts = {}) => {
        if (!ds.getStoredLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        return fetch(`${API_BASE_URL}/project-statuses`, {
    
        })
            .then(r => r.json())
            .then(data => {
               
                return data
            })
    },
    getUsers: (opts = {}) => {
        if (!ds.getStoredLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = { ...usersDefaultOptions, ...opts }

        const qs = queryString.stringify(mergedOpts)
        

        return fetch(`${API_BASE_URL}/users?` + qs, {
            headers: addAuthTokenHeader(),
        })
            .then(r => r.json())
            .then(data => {
                
                return data
            })

    },
    saveUser: (data) => {
        return fetch(`${API_BASE_URL}/users/create`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: addAuthTokenHeader({
                'Content-type': 'application/json'
            }),
        })
    },

    saveProject: (data) => {
        return fetch(`${API_BASE_URL}/projects/create`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: addAuthTokenHeader({
                'Content-type': 'application/json'
            }),
        })
    },
    deleteProject: (id) => {
        return fetch(`${API_BASE_URL}/projects/id/${id}`, {
            method: 'delete',
            headers: addAuthTokenHeader(),
        })
    },

    getProjects: (opts = {}) => {
        if (!ds.getStoredLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = { ...projectsDefaultOptions, ...opts }

        const qs = queryString.stringify(mergedOpts)
        

        return fetch(`${API_BASE_URL}/projects/?` + qs, {
            headers: addAuthTokenHeader(),
        })
            .then(r => r.json())
            .then(data => {
                
                return data
            })

    },
    doLogin: async (email, password) => {

        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        const tokenData = await fetch(
            `${API_BASE_URL}/auth/login`,
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers,
            }
        )
            .then(r => r.json())
        return tokenData

    },
}
export default ds

