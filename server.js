const express = require('express')
const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const app = express()

// Middleware-ek
app.use(express.json()) //json formátum megkövetelése
app.use(express.urlencoded({extended: true})); //req body-n keresztül átmenjenek az adatok

let users = []
const USERS_FILE = path.join(__dirname, 'user.json')

loadUsers()
// ENDPOINTS

app.get('/', (req, res) => {
  res.send('Backend API by Bajai SZC Türr István Technikum - 13.A Szoftverfejlesztő ')
})

// GET all users

app.get('/user', (req, res)=>{
    res.send(users)
});

// GET one user by id

app.get('/user/:id',(req,res)=>{
    let id = req.params.id
    let idx = users.findIndex(user => user.id == id)
    if(idx >-1){
        return res.send(users[idx])
    }
    return res.send("Nincs ilyen azonosítójú felhasználó!")
    
})


// POST new user
app.post('/user', (req,res)=>{
 let data = req.body;
 data.id = getNextId();
 users.push(data)
 res.send('Termeszek')
 saveUsers()
});

// DELETE user
app.delete('/user/:id', (req,res)=>{
    let id = req.params.id
    let idx = users.findIndex(user => user.id == id)
    if(idx >-1){
        users.splice(idx,1)
        return res.send("A felhasználó törölve.")
    }
    return res.send("Nincs ilyen azonosítójú felhasználó!")
    saveUsers()
});

// UPDATE user by id

app.patch('/user/:id', (req,res)=>{
    let id = req.params.id
    let data = req.body
    let idx = users.findIndex(user => user.id == id)
    if(idx >-1){
        users[idx] = data
        users[idx].id = Number(id)
        return res.send("A felhasználó módosítva.")
    }
    return res.send("Nincs ilyen azonosítójú felhasználó!")
    saveUsers()
})

app.listen(3000)

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