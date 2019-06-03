// https://www.npmjs.com/package/faker
// this generates data flattenedData.json
const faker = require("faker");
faker.seed(123);
const { parse, stringify } = require("flatted/cjs");
const util = require("util");
const prettyjson = require("prettyjson");
// const statuses = ["estimate", "in progress", "billed", "other"];

function unique(fn, arr, objKey) {
  const value = fn();
  const exists = arr.find(item => item[objKey] === value);
  if (exists !== undefined) {
    return unique(fn, arr, objKey);
  }
  return value;
}

const roles = [
  { id: 1, title: "Admin" },
  { id: 2, title: "Client" },
  { id: 3, title: "Contractor" },
  { id: 4, title: "Project Manager" }
];
const statuses = [
  { id: 1, status: "estimate" },
  { id: 2, status: "in progress" },
  { id: 3, status: "billed" },
  { id: 4, status: "other" }
];

const users = [];
for (let i = 0; i < 2; i++) {
  const adminRole = roles[0];
  const admin = {
    id: faker.random.uuid(),
    email: unique(faker.internet.email, users, "email"),
    username: unique(faker.internet.userName, users, "username"),
    full_name: faker.name.findName(),
    phone: faker.phone.phoneNumberFormat(),
    password: faker.internet.password(),
    //associated objects
    role: adminRole, //the role Object corresponding to the role_id
    isAdmin: true,
    projects: []
  };
  users.push(admin);
}

for (let i = 0; i < 20; i++) {
  const remainingRoles = [...roles];
  remainingRoles.shift();
  const randomRole =
    remainingRoles[Math.floor(Math.random() * remainingRoles.length)];
  const user = {
    //fields
    id: faker.random.uuid(),
    email: unique(faker.internet.email, users, "email"),
    username: unique(faker.internet.userName, users, "username"),
    full_name: faker.name.findName(),
    phone: faker.phone.phoneNumberFormat(),
    password: faker.internet.password(),
    isAdmin: false,
    //associated objects
    role: randomRole, //the role Object corresponding to the role_id
    projects: []
  };
  users.push(user);
}
const clients = users.filter(user => {
  return user.role.id === 2;
});
const contractors = users.filter(user => {
  return user.role.id === 4;
});
const projectManagers = users.filter(user => {
  return user.role.id === 3;
});
const projects = [];
for (let i = 0; i < 1000; i++) {
  const contractor1 =
    contractors[Math.floor(Math.random() * contractors.length)];
  const contractor2 =
    contractors[Math.floor(Math.random() * contractors.length)];
  const client = clients[Math.floor(Math.random() * clients.length)];
  const projectManager =
    projectManagers[Math.floor(Math.random() * projectManagers.length)];

  const projectStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const beginDate = faker.date.recent(60);
  const estimatedDate = faker.date.between(beginDate, faker.date.recent());
  const billedDate = faker.date.between(estimatedDate, faker.date.recent());
  const project = {
    //fields
    id: i,
    title: unique(faker.company.companyName, projects, "title"),
    description: unique(faker.lorem.sentence, projects, "description"),
    budget: unique(faker.finance.amount, projects, "budget"),
    status: projectStatus,
    startDate: beginDate,
    estimatedDueDate:
      projectStatus === "in progress" || projectStatus === "billed"
        ? estimatedDate
        : null,
    completionDate: projectStatus === "billed" ? billedDate : null,
    //associated objects
    client: [client], //relation based on client_id
    contractors: [contractor1, contractor2],
    projectManager: [projectManager]
  };

  contractor1.projects = [project];
  contractor2.projects = [project];
  client.projects = [project];
  projectManager.projects = [project];

  projects.push(project);
}
const collections = stringify({
  users,
  projects,
  roles,
  statuses
});
// const jsonUser= JSON.stringify(flattedUser)
console.log(collections);

// export const GetUsers=()=>{
//     let res=[...users]
//     // const result= parse(stringify(res))
//     return Promise.resolve(res)
// }
// export const GetProjects= ()=>{
//     let ret = [...projects]
//     parse(stringify(ret))
//     return Promise.resolve(ret)
// }
// fake API
// function getProjects(options = {
//     dateStart:null,
//     dateEnd:null,
//     status:null,

// }) {
//     let ret = [...projects]
//     if(options.dateStart){
//         ret = ret.filter(user=>dayjs().isAfter()) //TODO fix this
//     }
//     return Promise.resolve(ret)
// }
