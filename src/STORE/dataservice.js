/* eslint-disable import/first */
import dataString from './flattenedData.json';
import fjs from 'flatted/cjs';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
const { parse, stringify } = fjs
// debugger;
// console.log('data', dataString)
let data = parse(JSON.stringify(dataString));
console.log('parsed data', data)
export default {
    getUsers: () => {
        let res = [...data.users]
        // return res
        // const result= parse(stringify(res))
        return Promise.resolve(res)
    },
    getProjects:()=>{
        let res=[...data.projects]
        return Promise.resolve(res)
    },
    getUserLogin: (email, password)=>{
        let users=[...data.users]
        let findLoginUser= users.find(user=>user.email=== email && user.password === password)
        return findLoginUser
    }
    // getProjects: () => {}
}

