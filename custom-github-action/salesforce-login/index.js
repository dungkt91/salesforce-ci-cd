const core = require('@actions/core');
const github = require('@actions/github');

const url = core.getInput('url');
const username = core.getInput('username');
const password = core.getInput('password');

console.log("url: ", url);
console.log("username: ", username);
console.log("password: ", password);