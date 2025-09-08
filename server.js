
const express = require('express')

const app = express()

let users = [
    {id: 1,name: "Béla", age: 23, gender: "male"},
    {id: 2,name: "Éva", age: 18, gender: "female"},
    {id: 3,name: "Tamás", age: 28, gender: "male"},
    {id: 4,name: "Mária", age: 67, gender: "female"},

]
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


app.listen(3000)