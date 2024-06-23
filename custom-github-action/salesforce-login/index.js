const core = require('@actions/core');
const github = require('@actions/github');

const url = core.getInput('url');
const username = core.getInput('username');
const password = core.getInput('password');

async function run(){
    let response = await fetch("http://www.google.com");
    console.log("body: ", await response.text());
}

console.log("run");
run();
