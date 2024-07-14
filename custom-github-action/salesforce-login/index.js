const core = require('@actions/core');
const github = require('@actions/github');

const orgType = core.getInput('orgType');
const username = core.getInput('username');
const password = core.getInput('password');
const apiVersion = core.getInput('apiVersion');

const ORG_TYPE_URL = {
    "production": `https://login.salesforce.com/services/Soap/u/${apiVersion}`,
    "sandbox": `https://test.salesforce.com/services/Soap/u/${apiVersion}`
}

async function getAccessToken(){
    let url = ORG_TYPE_URL[orgType];
    if(!url){
        throw new Error("Url is null")
    }

    let requestBody = `
        <?xml version="1.0" encoding="utf-8" ?>
            <env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
            <env:Body>
                <n1:login xmlns:n1="urn:partner.soap.sforce.com">
                <n1:username>${username}</n1:username>
                <n1:password>${password}</n1:password>
                </n1:login>
            </env:Body>
        </env:Envelope>
    `
    const response = await fetch(url, {
        method: "POST",
        body: requestBody,
        headers: {
            "Content-Type": "text/xml",
            "SOAPAction": "login",
            "charset": "UTF-8"
        }
    });
    const responseBody = await response.text();

    console.log("responseBody: ", responseBody);
}

getAccessToken();
