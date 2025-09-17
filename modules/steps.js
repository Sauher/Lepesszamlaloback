const express = require('express')
const router = express.Router()

const {stepdata,getNextStepId,saveStepdata} = require(`../utils/store`)
// GET all steps of all users
router.get('/',(req,res) => {
    res.send(stepdata)
})


// GET all steps by userID

router.get('/user/:uid',(req,res) => {
    let usersteps = []
    let uid = Number(req.params.uid)

    if(uid == -1){
        res.status(400).send({msg: "Nincs ilyen felhasználó!"})
    }
    for (let i = 0; i < stepdata.length; i++) {
        if(stepdata[i].uid == uid){
            usersteps.push(stepdata[i])
        }
        
    }
    res.send(usersteps)
})

// GET one step by id

router.get('/:id', (req,res) =>{
    let id = Number(req.params.id)
    let idx = stepdata.findIndex(step => Number(step.id) === id)
    if(idx >-1){
        return res.send(stepdata[idx])
    }
    return res.status(400).send({msg:"Nincs ilyen azonosítójú lépés!"})
})

//POST new stepdata
router.post('/',(req,res) =>{
    let data = req.body;
    data.id = getNextStepId();
    stepdata.push(data)
    saveStepdata()
    res.send({msg: "Sikeres adatfelvitel!"})
});



//PATCH stepdata by id
router.patch('/:id',(req,res) => {
    let id = Number(req.params.id)
    let data = req.body
    let idx = stepdata.findIndex(step => Number(step.id) === id)
    if (idx > -1) {
        if (data.date) stepdata[idx].date = data.date
        if (data.stepcount) stepdata[idx].stepcount = data.stepcount
        saveStepdata()
        return res.send({ msg: "A lépésszám módosítva.", step: stepdata[idx] })
    }
    return res.status(400).send({ msg: "Nincs ilyen azonosítójú lépésadat" })
})


// DELETE stepdata

router.delete('/:id',(req,res) =>{
    let id = Number(req.params.id)
    let idx = stepdata.findIndex(step => Number(step.id) === id)
    stepdata.splice(idx,1)
    saveStepdata()
    res.send({msg:"Sikeres törlés!"})
})

// DELETE all steps by userID
router.delete('/user/:uid', (req,res) =>{
    let uid = Number(req.params.uid)

    if(uid == -1){
        res.status(400).send({msg: "Nincs ilyen felhasználó!"})
    }
    for (let i = 0; i < stepdata.length; i++) {
        if(stepdata[i].uid == uid){
            stepdata.splice(i,1)
            i--
        }
        
    }
    saveStepdata()
    res.send({msg: "Sikeresen törölve!"})
})

// DELETE all steps by users
router.delete('/',(req,res) =>{
    stepdata = []
    saveStepdata()
    res.send({msg:"Összes adat törölve"})
})

module.exports = router;