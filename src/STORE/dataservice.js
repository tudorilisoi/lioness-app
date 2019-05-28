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
            window.alert('Email does not match any user, please reenter your email and password')
            return Promise.reject(('No such user'))
            
        }else if(password !== findUser.password){
            window.alert('Password does not match email, please reenter your email and password')

            return Promise.reject( ('Wrong password'))
        }else{
            return Promise.resolve(findUser)
        }
    }
    
    // getProjects: () => {}
}

