/* eslint-disable import/first */
import dataString from './flattenedData.json';
import Cookie from "js.cookie"
import fjs from 'flatted/cjs';
import { reject } from 'q';
import { createEmitAndSemanticDiagnosticsBuilderProgram, reduceEachLeadingCommentRange } from 'typescript';
import { history } from '../index';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
import moment from 'moment'
dayjs.extend(isBetween)
const { parse, stringify } = fjs

let data = parse(JSON.stringify(dataString));
const defaultOptions = {
    statusFilter: null,
    searchQuery: null,
    budgetFilterAsending: null,
    dateTypeFilter: null,
    timePeriodFilter: null,
    dateSortAsc: null,
    userNameSortAsc:null,
    afterDate: null,
    beforeDate: null,
    roleFilter: null,
    activeProjSortAsc:null,
    noSorting: true,
    pageNumber: 1,
}
const NOT_LOGGED_IN = 'NOT_LOGGED_IN'
const ITEMS_PER_PAGE = 10

function delay(promiseObj) {
    return Promise(resolve => {
        window.setTimeout(resolve(promiseObj), 2000)
    })
}

console.log('parsed data', data)
const ds = {

    defaultProjectData: { data: [], numPages: 0, totalItemCount: 0 },

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
    getRoles:(opts = {})=>{
        if (!ds.getCookieLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = { ...defaultOptions, ...opts }
        let res = [...data.roles]
        return Promise.resolve(res)
    },
    getStatuses:(opts = {})=>{
        if (!ds.getCookieLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = { ...defaultOptions, ...opts }
        let res = [...data.statuses]
        return Promise.resolve(res)
    },
    getUsers: (opts = {}) => {
        if (!ds.getCookieLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = { ...defaultOptions, ...opts }
        // console.log(`getUsers Opts`, mergedOpts)
        let res = [...data.users]
        if (mergedOpts.roleFilter) {
            res = res.filter(user => user.role.id === mergedOpts.roleFilter)
        }
       if (mergedOpts.userNameSortAsc=== true && !mergedOpts.noSorting){
        res = res.sort((a, b) => {
            return  a.full_name.localeCompare(b.full_name);
        })
       }
       if (mergedOpts.userNameSortAsc=== false && !mergedOpts.noSorting){
        res = res.sort((a, b) => {
            return  b.full_name.localeCompare(a.full_name);
        })
        
       }
       if (mergedOpts.activeProjSortAsc=== true && !mergedOpts.noSorting && mergedOpts.userNameSortAsc===null){
          res= res.map(user=>{
            let projects=user.projects.filter(project=>project.status.title==='in progress').length
        return projects
           }
            )
           console.log(`hi active projects count`,res)
       }
       if (mergedOpts.activeProjSortAsc=== false && !mergedOpts.noSorting && mergedOpts.userNameSortAsc===null){
        console.log(`hi active projects count false`)
    }
        return Promise.resolve(res)
    },
    getProjects: (opts = {}) => {
        if (!ds.getCookieLoginInfo()) {
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = { ...defaultOptions, ...opts }

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

        if (mergedOpts.dateSortAsc === true && !mergedOpts.noSorting) {

            if (mergedOpts.dateTypeFilter === 'startDate') {
                res = res.sort((a, b) => (new Date(b.startDate) - new Date(a.startDate)))

            }
            if (mergedOpts.dateTypeFilter === 'estimatedDueDate') {
                res = res.sort((a, b) => (new Date(b.estimatedDueDate) - new Date(a.estimatedDueDate)))

            }
            if (mergedOpts.dateTypeFilter === 'completionDate') {
                res = res.sort((a, b) => (new Date(b.completionDate) - new Date(a.completionDate)))

            }
        }
        if (mergedOpts.dateSortAsc === false && !mergedOpts.noSorting) {
            if (mergedOpts.dateTypeFilter === 'startDate') {
                res = res.sort((a, b) => (new Date(a.startDate) - new Date(b.startDate)))
            }
            if (mergedOpts.dateTypeFilter === 'estimatedDueDate') {
                res = res.sort((a, b) => (new Date(a.estimatedDueDate) - new Date(b.estimatedDueDate)))
            }
            if (mergedOpts.dateTypeFilter === 'completionDate') {
                res = res.sort((a, b) => (new Date(a.completionDate) - new Date(b.completionDate)))
            }
        }

        if (mergedOpts.budgetFilterAsending === true && !mergedOpts.noSorting && mergedOpts.dateSortAsc === null) {
            res = res.sort((a, b) => (b.budget - a.budget))

        }
        if (mergedOpts.budgetFilterAsending === false && !mergedOpts.noSorting && mergedOpts.dateSortAsc === null) {
            res = res.sort((a, b) => (a.budget - b.budget))

        }


        const begin = (mergedOpts.pageNumber - 1) * ITEMS_PER_PAGE
        const end = (mergedOpts.pageNumber) * ITEMS_PER_PAGE
        const numPages = Math.ceil(res.length / ITEMS_PER_PAGE)
        const totalItemCount = res.length

        res = res.slice(begin, end)
      


        return Promise.resolve({
            data: res,
            numPages,
            totalItemCount,
        })
    },
    getUserLogin: (email, password) => {

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

