const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const PORT = process.env.PORT || 4000;

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile("index.html")
} )

//TODAS
app.get('/all', (req, res) => {
    let data = fs.readFileSync('./data/mascotas.json')
    let pets = JSON.parse(data)
    res.json(pets)
})

//SEGUN NOMBRE
app.get('/searchPetName/:name', (req, res) => {
    let data = fs.readFileSync('./data/mascotas.json')
    let pets = JSON.parse(data).pets
    const petFound = pets.find(pet => pet.name === req.params.name)
    !petFound && res.status(404).json({ message: 'pet not found' })
    res.json(petFound)

})

//SEGUN RUT DEL DUEÑO
app.get('/searchPetRut/:rut', (req, res) => {
    let data = fs.readFileSync('./data/mascotas.json')
    let pets = JSON.parse(data).pets
    const petOwner = pets.filter(pet => pet.rut === req.params.rut)

    !petOwner && res.status(404).json({ message: 'pet not found' })
    res.json(petOwner)
})

//NUEVA MASCOTA
app.post('/insertPet/:newPet', (req, res) => {
    let data = fs.readFileSync('./data/mascotas.json')
    let pets = JSON.parse(data)
    console.log(pets)
    pets.pets.push(req.query)
    fs.writeFileSync('./data/mascotas.json', JSON.stringify(pets))
    res.send(pets)
})

//ELIMINAR MASCOTA NOMBRE
app.delete('/deletePetName/:namePet', (req, res) => {
    let data = fs.readFileSync('./data/mascotas.json')
    let pets = JSON.parse(data)
    const petFound = pets.pets.find(pet => pet.name === req.params.namePet)
    if (!petFound) {
        res.status(404).json({ message: 'pet not found' })
    } else {
        pets = pets.pets.filter(pet => pet.name !== req.params.namePet)
        console.log(pets)
        fs.writeFileSync('./data/mascotas.json', `{"pets": ${JSON.stringify(pets)}}`)
        res.sendStatus(204)
    }
})

//ELIMINAR MASCOTAS DUEÑO
app.delete('/deletePetRut/:ownerRut', (req, res) => {
    let data = fs.readFileSync('./data/mascotas.json')
    let pets = JSON.parse(data)
    const petFound = pets.pets.find(pet => pet.rut === req.params.ownerRut)
    if (!petFound) {
        res.status(404).json({ message: 'owner not found' })
    } else {
        pets = pets.pets.filter(pet => pet.rut !== req.params.ownerRut)
    console.log(pets)
    fs.writeFileSync('./data/mascotas.json', `{"pets": ${JSON.stringify(pets)}}`)
    res.sendStatus(204)
    }
})

app.listen(PORT, () => {
    console.log(`Server echando chispas en el puerto: ${PORT}`);
  });
  