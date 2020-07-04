const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// module containing the function that dynamically generates the markdown
const generateMarkdown = require('./utils/generateMarkdown');


const writeFileAsync = util.promisify(writeToFile);

// array of questions for user
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
    },
    {
        type: "input",
        name: "description",
        message: "Enter a description of your project."
    },
    {
        type: "input",
        name: "installation",
        message: "If appropriate, enter the steps required to install your project."
    },
    {
        type: "input",
        name: "usage",
        message: "Provide instructions and examples for your project usage. Include screenshots as needed."
    },
    {
        type: "input",
        name: "contributing",
        message: "If you would like other developers to contribute to your application, enter the necessary guidelines."
    },
    {
        type: "input",
        name: "tests",
        message: "If interested, write tests for your application and provide examples on how to run them."
    },
    {
        type: "list",
        name: "license",
        message: "Choose a license for your application.",
        choices: ["MIT","ODbL", "ISC", "Unlicense", "Zlib"],
    },
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email address?"
    },
      
];

// function to write README file
function writeToFile(fileName, data) {
   fs.writeFile(fileName, data, err =>{
       if (err) {
           return console.log(err);
       }
       console.log("README.md Generated!")
   });
}


// function to initialize program
async function init() {
    try {
    
        // user questions from the inquirer npm
        const data = await inquirer.prompt(questions);
        console.log("User Responses: ", data);
        
        // generating README.md using the user's answers and the user data from the github api
        const readMe = generateMarkdown(data);
        console.log(readMe);
        
        // writing the generated readme.md to the file
        await writeFileAsync('SampleREADME.md', readMe);
    }
    catch(err) {    
        console.log(err);
    }
};

// function call to initialize program
init();

