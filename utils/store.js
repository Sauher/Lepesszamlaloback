const fs = require('fs');
const path = require('path');
const USERS_FILE = path.join(__dirname,"..","/database", 'user.json')
const STEPS_FILE = path.join(__dirname,"..","/database", 'steps.json')
let users = []
let stepdata = []
initStore()

const { json } = require('stream/consumers');

function initStore(){
    loadUsers()
    loadStepdata()
}
function getNextStepId(){
    let nextID = 1;

    if (stepdata.length == 0){
        return nextID
    }
    
    let maxIndex = 0
    for (let i = 0; i < stepdata.length; i++) {
        if(stepdata[i].id > stepdata[maxIndex].id){
            maxIndex = i
        }
        
    }
    return stepdata[maxIndex].id + 1
}
function getNextId(){
    let nextID = 1;

    if (users.length == 0){
        return nextID
    }
    
    let maxIndex = 0
    for (let i = 0; i < users.length; i++) {
        if(users[i].id > users[maxIndex].id){
            maxIndex = i
        }
        
    }
    return users[maxIndex].id + 1
}

function loadUsers(){
    if(fs.existsSync(USERS_FILE)){
        const raw = fs.readFileSync(USERS_FILE)
        try{
            users = JSON.parse(raw)
        }
        catch(err){
            console.log("Hiba az adatok beolvasása közben!", err)
            users = [];

        }
    }
    else{
        saveUsers()
    }
   
}

function saveUsers(){
    fs.writeFileSync(USERS_FILE,JSON.stringify(users))
}
function isEmailExist(email){
    let exists = false
    users.forEach(user=> {
        if(user.email == email){
            exists = true
            return
        }
    })
    return exists
}
function saveStepdata(){
    fs.writeFileSync(STEPS_FILE,JSON.stringify(stepdata))
}
function loadStepdata(){
    if(fs.existsSync(STEPS_FILE)){
        const raw = fs.readFileSync(STEPS_FILE)
        try{
            stepdata = JSON.parse(raw)
        }
        catch(err){
            console.log("Hiba az adatok beolvasása közben!", err)
            stepdata = [];

        }
    }
    else{
        saveStepdata()
    }
}
module.exports = {
    initStore,getNextId,getNextStepId,saveStepdata,saveUsers,isEmailExist,users,stepdata
}