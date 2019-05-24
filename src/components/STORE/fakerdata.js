// https://www.npmjs.com/package/faker
const faker = require('faker')
faker.seed(123);
const { parse, stringify } = require('flatted/cjs');
const util= require('util')
const prettyjson=require('prettyjson')

function unique(fn, arr, objKey) {
    const value = fn()
    const exists = arr.find(item => item[objKey] === value)
    if (exists !== undefined) {
        return unique(fn, arr, objKey)
    }
    return value
}

const roles = [
    { id: 1, title: 'Admin' },
    { id: 2, title: 'Client' },
    { id: 3, title: 'Contractor' },
    { id: 4, title: 'Project Manager' },
]


const users = []
for (let i = 0; i < 30; i++) {
    const randomRole = roles[Math.floor(Math.random() * roles.length)]
    const user = {

        //fields
        id: i,
        email: unique(faker.internet.email, users, 'email'),
        username: unique(faker.internet.userName, users, 'username'),
        full_name: faker.name.findName(),
        phone: faker.internet.phone,

        //associated objects
        role: randomRole, //the role Object corresponding to the role_id
        projects: [],
    }
    users.push(user)
}

const clients= users.filter(user=>{
    return user.role.id===2;
});
const contractors= users.filter(user=>{
    return user.role.id===4;
});
const projectManagers=users.filter(user=>{
    return user.role.id===3;
});
const projects = []
for (let i = 0; i < 30; i++) {
    const contractor1 = contractors[Math.floor(Math.random() * contractors.length)]
    const contractor2 = contractors[Math.floor(Math.random() * contractors.length)]
    const client= clients[Math.floor(Math.random() * clients.length)]
const projectManager=projectManagers[Math.floor(Math.random() * projectManagers.length)]
const status=["estimate", "in progress", "billed", "other"]
const projectStatus=status[Math.floor(Math.random()*status.length)]
if(projects.status==='"in progress"'){
    projects.estimatedDueDate=== faker.date.between('2019-06-01', '2019-08-31')
}else
projects.estimatedDueDate===null;
    const project = {
        //fields
        id: i,
        title: unique(faker.internet.userName, projects, 'title'),
        description:unique(faker.lorem.sentence, projects,'description'), 
        budget: unique(faker.finance.amount, projects, 'budget'),
        status: projectStatus,
        startDate:faker.date.between('2019-01-01', '2019-05-31'),
        estimatedDueDate: null,
        //associated objects
        client: [client], //relation based on client_id
        contractors: [contractor1, contractor2],
        projectManager: [projectManager],
    }

    contractor1.projects = [project]
    contractor2.projects = [project]

    projects.push(project)
}
console.log(parse(stringify(projects, null, 2)))
// console.log(util.inspect(projects,false, null, true))


//fake API
function getProjects(options = {
    dateStart:null,
    dateEnd:null,
    status:null,

}) {
    let ret = [...projects]
    if(options.dateStart){
        ret = ret.filter(user=>dayjs().isAfter()) //TODO fix this
    }
    return Promise.resolve(ret)
}