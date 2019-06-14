/* eslint-disable import/first */
import dataString from './flattenedData.json';
import Cookie from "js.cookie"
import fjs from 'flatted/cjs';
import { default as deterministicStringify } from 'json-stable-stringify'
import { reject } from 'q';
import { history } from '../index';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import moment from 'moment'
dayjs.extend(isBetween)
const { parse, stringify } = fjs

let data = parse(JSON.stringify(dataString));

const SORT_ASC = 'ASC'
const SORT_DESC = 'DESC'

//TODO split this into separate defaults for users, roles and so on
const projectsDefaultOptions = {
    statusFilter: null,
    searchQuery: null,
    budgetSort: SORT_ASC,
    dateTypeFilter: null,
    dateSort: null,
    afterDate: null,
    beforeDate: null,
    roleFilter: null,
    activeProjSortAsc: null,
    pageNumber: 1,
}
const usersDefaultOptions = {
    idsFilter: null, // pass a non-empty array to fetch users by theirs ids
    searchQuery: null,
    userNameSortAsc: null,
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

console.log('parsed data', data)
const ds = {

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
    getCookieLoginInfo: () => {
        return Cookie.get("credentials");
    },
    setCookieLoginInfo: (loginData) => {
        Cookie.set("credentials", loginData);
    },
    deleteCookieLoginInfo: () => {
        Cookie.remove("credentials");
    },
    getRoles: (opts = {}) => {
        if (!ds.getCookieLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }

        let res = [...data.roles]
        return Promise.resolve(res)
    },
    getStatuses: (opts = {}) => {
        if (!ds.getCookieLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        let res = [...data.statuses]
        return delay(Promise.resolve(res), 500)
    },
    getUsers: (opts = {}) => {
        if (!ds.getCookieLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = { ...usersDefaultOptions, ...opts }

        console.log('getUsers filters:', mergedOpts)

        // console.log(`getUsers Opts`, mergedOpts)
        let res = [...data.users]

        if (mergedOpts.roleFilter) {
            res = res.filter(user => user.role.id === mergedOpts.roleFilter)
        }

        if (mergedOpts.searchQuery) {
            res = res.filter(u => u.full_name.toLowerCase().indexOf(mergedOpts.searchQuery.toLowerCase()) === 0)
        }

        if (mergedOpts.userNameSortAsc === true && !mergedOpts.noSorting) {
            res = res.sort((a, b) => {
                return a.full_name.localeCompare(b.full_name);
            })
        }
        if (mergedOpts.userNameSortAsc === false && !mergedOpts.noSorting) {
            res = res.sort((a, b) => {
                return b.full_name.localeCompare(a.full_name);
            })

        }
        
        if (mergedOpts.idsFilter) {
            res = res.filter(u => mergedOpts.idsFilter.includes(u.id))
        }

        const begin = (mergedOpts.pageNumber - 1) * ITEMS_PER_PAGE
        const end = (mergedOpts.pageNumber) * ITEMS_PER_PAGE
        const numPages = Math.ceil(res.length / ITEMS_PER_PAGE)
        const totalItemCount = res.length

        res = res.slice(begin, end)

        return delay(Promise.resolve({
            data: res,
            numPages,
            totalItemCount,
        }))

    },
    getProjects: (opts = {}) => {
        if (!ds.getCookieLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = { ...projectsDefaultOptions, ...opts }

        console.log('getProjects filters:', mergedOpts)

        let res = [...data.projects]


        if (mergedOpts.statusFilter) {
            res = res.filter(project => {
                // 
                return project.status.title === mergedOpts.statusFilter
            })
        }
        if (opts.searchQuery) {
            res = res.filter(project => {
                let res = false
            })
        }
        if (mergedOpts.beforeDate) {
            if (mergedOpts.dateTypeFilter === 'startDate') {
                res = res.filter(project => {
                    return dayjs(project.startDate).isBefore(dayjs(mergedOpts.beforeDate))
                })
            }
            if (mergedOpts.dateTypeFilter === 'estimatedDueDate') {
                res = res.filter(project => {
                    return dayjs(project.estimatedDueDate).isBefore(dayjs(mergedOpts.beforeDate))
                })
            }
            if (mergedOpts.dateTypeFilter === 'completionDate') {
                res = res.filter(project => {
                    return dayjs(project.completionDate).isBefore(dayjs(mergedOpts.beforeDate))
                })
            }
        }
        if (mergedOpts.afterDate) {
            if (mergedOpts.dateTypeFilter === 'startDate') {
                res = res.filter(project => {
                    return dayjs(project.startDate).isAfter(dayjs(mergedOpts.afterDate))
                })
            }
            if (mergedOpts.dateTypeFilter === 'estimatedDueDate') {
                res = res.filter(project => {
                    return dayjs(project.estimatedDueDate).isAfter(dayjs(mergedOpts.afterDate))
                })
            }
            if (mergedOpts.dateTypeFilter === 'completionDate') {
                res = res.filter(project => {
                    return dayjs(project.completionDate).isAfter(dayjs(mergedOpts.afterDate))
                })
            }
        }
        if (mergedOpts.afterDate && mergedOpts.beforeDate) {
            if (mergedOpts.dateTypeFilter === 'startDate') {
                res = res.filter(project => {
                    return dayjs(project.startDate).isBetween(dayjs(mergedOpts.afterDate), dayjs(mergedOpts.beforeDate))
                })
            }
            if (mergedOpts.dateTypeFilter === 'estimatedDueDate') {
                res = res.filter(project => {
                    return dayjs(project.estimatedDueDate).isBetween(dayjs(mergedOpts.afterDate), dayjs(mergedOpts.beforeDate))
                })
            }
            if (mergedOpts.dateTypeFilter === 'completionDate') {
                res = res.filter(project => {
                    return dayjs(project.completionDate).isBetween(dayjs(mergedOpts.afterDate), dayjs(mergedOpts.beforeDate))
                })
            }
        }

        if (mergedOpts.dateSort) {
            const direction = mergedOpts.dateSort === ds.SORT_ASC ? 1 : -1
            if (mergedOpts.dateTypeFilter === 'startDate') {
                res = res.sort((a, b) => direction * (new Date(b.startDate) - new Date(a.startDate)))

            }
            if (mergedOpts.dateTypeFilter === 'estimatedDueDate') {
                res = res.sort((a, b) => direction * (new Date(b.estimatedDueDate) - new Date(a.estimatedDueDate)))

            }
            if (mergedOpts.dateTypeFilter === 'completionDate') {
                res = res.sort((a, b) => direction * (new Date(b.completionDate) - new Date(a.completionDate)))

            }
        }


        if (mergedOpts.budgetSort) {
            const direction = mergedOpts.budgetSort === ds.SORT_ASC ? 1 : -1
            res = res.sort((a, b) => direction * (b.budget - a.budget))
        }

        const begin = (mergedOpts.pageNumber - 1) * ITEMS_PER_PAGE
        const end = (mergedOpts.pageNumber) * ITEMS_PER_PAGE
        const numPages = Math.ceil(res.length / ITEMS_PER_PAGE)
        const totalItemCount = res.length

        res = res.slice(begin, end)



        return delay(Promise.resolve({
            data: res,
            numPages,
            totalItemCount,
        }))
    },
    doLogin: (email, password) => {

        let users = [...data.users]
        let findUser = users.find(user => user.email === email)
        if (!findUser) {
            window.alert('Email does not match any user, please reenter your email and password')
            return Promise.reject(('No such user'))

        } else if (password !== findUser.password) {
            window.alert('Password does not match email, please reenter your email and password')

            return Promise.reject(('Wrong password'))
        } else {

            return Promise.resolve(findUser)
        }
    },
}
export default ds

