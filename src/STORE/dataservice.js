/* eslint-disable import/first */
import dataString from './flattenedData.json';
import fjs from 'flatted/cjs';
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
    // getProjects: () => {}
}

