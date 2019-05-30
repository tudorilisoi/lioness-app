/* eslint-disable import/first */
import dataString from './flattenedData.json';
import Cookie from "js.cookie"
import fjs from 'flatted/cjs';
import { reject } from 'q';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import {history} from '../index'
const { parse, stringify } = fjs
// debugger;
// console.log('data', dataString)
let data = parse(JSON.stringify(dataString));
const defaultOptions = {
    statusFilter: null,
    startDateFilter:null,
    pageNumber: 1,
}
const NOT_LOGGED_IN = 'NOT_LOGGED_IN'

console.log('parsed data', data)
const ds =  {

    statuses:["estimate", "in progress", "billed", "other"],

    handleFetchError:(err)=>{
        // debugger
        if(err.message===NOT_LOGGED_IN){
            console.log('redirecting to login')
            history.push('/login')
        }
    },
    getCookieLoginInfo:()=>{
        return Cookie.get("credentials");       
    },
    setCookieLoginInfo:(loginData)=>{
        Cookie.set("credentials", loginData);       
    },

    getUsers: () => {
        // debugger
    let res = [...data.users]
    // return res
    // const result= parse(stringify(res))
    return Promise.resolve(res)
    },
    getProjects:(opts={})=>{
        if(!ds.getCookieLoginInfo()){
            // throw new Error(NOT_LOGGED_IN)
            return Promise.reject(new Error(NOT_LOGGED_IN))
        }
        const mergedOpts = {...defaultOptions, ...opts}
console.log('getProjects opts:', mergedOpts)                
        let res = [...data.projects]
        if(opts.statusFilter){
            res =  res.filter(project=>project.status===opts.statusFilter)
        }
return Promise.resolve(res)
    },
    getUserLogin: (email, password)=>{
        let users=[...data.users]
        let findUser=users.find(user=>user.email === email)
        if(!findUser){
            window.alert('Email does not match any user, please reenter your email and password')
            return Promise.reject(('No such user'))
            
        }else if(password !== findUser.password){
            window.alert('Password does not match email, please reenter your email and password')

            return Promise.reject( ('Wrong password'))
        }else{
            return Promise.resolve(findUser)
        }
    },
    // statusFilter: (status)=>{
    //     let projects= [...data.projects]
    //     if(status==='allProjects'){
    //         return Promise.resolve(projects)
    //     }else {
    //         const projectByStatus= projects.filter(project=>project.status===status)
    // return Promise.resolve(projectByStatus)
    //     }
    // },
    
    // getProjects: () => {}
}
export default ds

