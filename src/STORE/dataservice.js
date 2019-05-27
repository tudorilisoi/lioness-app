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
        let findUser=users.find(user=>user.email === email)
        console.log(findUser)
        if(!findUser){
            throw (new Error('Email does not match any user, please reenter your email and password'))
        }
        if(password!==findUser.password){
            throw (new Error('Password does not match email, please reenter your email and password'))
        }
        
       else{
        return Promise.resolve(findUser)
       }
        
    }
    // getProjects: () => {}
}

