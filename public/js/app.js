//DOM 
const containerPets = document.getElementById('containerPets')
const fragmentPets = document.createDocumentFragment()
const templateCardPet = document.getElementById('templateCardPet').content
const templateError = document.getElementById('templateError').content

//Retorna TODAS las mascotas
const btnAll = document.querySelector('.btn-primary')
btnAll.addEventListener('click', async () => {
    try {
        //Obtener datos
        const response = await axios.get('http://localhost:3001/all')
        const arrayPets = response.data.pets


        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }
        arrayPets.map(pet => {
            /* console.log(pet) */
            let namePet = templateCardPet.getElementById('namePet')
            let ownerPet = templateCardPet.getElementById('ownerPet')
            namePet.textContent = pet.name
            ownerPet.textContent = pet.rut

            const clone = templateCardPet.cloneNode(true)
            fragmentPets.appendChild(clone)
        })

        containerPets.appendChild(fragmentPets)
    } catch (error) {
        console.log(error)
    }
})
//Retorna la mascota según su NOMBRE
const btnSearchPetName = document.querySelector('.btn-success')
btnSearchPetName.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        //Obtener datos
        const name = document.getElementById('nameSuccess').value;
        const response = await axios.get(`http://localhost:3001/searchPetName/${name}`)
        const foundPet = response.data

        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }

        /* console.log(pet) */
        let namePet = templateCardPet.getElementById('namePet')
        let ownerPet = templateCardPet.getElementById('ownerPet')
        namePet.textContent = foundPet.name
        ownerPet.textContent = foundPet.rut

        const clone = templateCardPet.cloneNode(true)
        fragmentPets.appendChild(clone)


        containerPets.appendChild(fragmentPets)
    } catch (error) {
        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }
        const clone = templateError.cloneNode(true)
        fragmentPets.appendChild(clone)
        containerPets.appendChild(fragmentPets)
    }
})
//Retorna todas mascotas con el RUT del dueño
const btnSearchPetRut = document.querySelector('.btn-secondary')
btnSearchPetRut.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        //Obtener datos
        const rut = document.getElementById('rutSecondary').value;
        const response = await axios.get(`http://localhost:3001/searchPetRut/${rut}`)
        const arrayPets = response.data
        console.log(arrayPets)
        if (arrayPets.length === 0) { throw new Error('Pet not found') }

        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }

        arrayPets.map(pet => {
            /* console.log(pet) */
            let namePet = templateCardPet.getElementById('namePet')
            let ownerPet = templateCardPet.getElementById('ownerPet')
            namePet.textContent = pet.name
            ownerPet.textContent = pet.rut

            const clone = templateCardPet.cloneNode(true)
            fragmentPets.appendChild(clone)
        })


        containerPets.appendChild(fragmentPets)

    } catch (error) {
        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }
        const clone = templateError.cloneNode(true)
        fragmentPets.appendChild(clone)
        containerPets.appendChild(fragmentPets)
    }
})
//Inserta una NUEVA mascota
const btnInsertPet = document.querySelector('.btn-danger')
btnInsertPet.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        //Obtener datos
        const name = document.getElementById('nameDanger').value
        const rut = document.getElementById('rutDanger').value
        const response = await axios.post(`http://localhost:3001/insertPet/newPet?name=${name}&rut=${rut}`)
        console.log(response.data)

        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }

        /* console.log(pet) */
        let namePet = templateCardPet.getElementById('namePet')
        let ownerPet = templateCardPet.getElementById('ownerPet')
        namePet.textContent = 'Listo!'
        ownerPet.textContent = 'Su mascota ha sido ingresada con éxito'

        const clone = templateCardPet.cloneNode(true)
        fragmentPets.appendChild(clone)


        containerPets.appendChild(fragmentPets)

    } catch (error) {
        console.log(error)
    }
})
//ELIMINAR MASCOTA por nombre 💀
const btnDeletePetName = document.querySelector('.btn-warning')
btnDeletePetName.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        //Obtener datos
        const name = document.getElementById('nameWarning').value
        const response = await axios.delete(`http://localhost:3001/deletePetName/${name}`)
        console.log(response)
        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }

        /* console.log(pet) */
        let namePet = templateCardPet.getElementById('namePet')
        let ownerPet = templateCardPet.getElementById('ownerPet')
        namePet.textContent = 'Listo!'
        ownerPet.textContent = 'Su mascota ha sido ingresada con éxito'

        const clone = templateCardPet.cloneNode(true)
        fragmentPets.appendChild(clone)


        containerPets.appendChild(fragmentPets)

    } catch (error) {
        console.log(error)
        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }
        const clone = templateError.cloneNode(true)
        fragmentPets.appendChild(clone)
        containerPets.appendChild(fragmentPets)
    }
})
//ELIMINAR MASCOTAS asociadas al rut del dueño 
//http://localhost:3001/deletePetRut/11111111-1
const btnDeletePetRut = document.querySelector('.btn-info')
btnDeletePetRut.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        //Obtener datos
        const rut = document.getElementById('rutInfo').value
        const response = await axios.delete(`http://localhost:3001/deletePetRut/${rut}`)
        console.log(response)
        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }

        /* console.log(pet) */
        let namePet = templateCardPet.getElementById('namePet')
        let ownerPet = templateCardPet.getElementById('ownerPet')
        namePet.textContent = 'Listo!'
        ownerPet.textContent = 'Su mascota ha sido ingresada con éxito'

        const clone = templateCardPet.cloneNode(true)
        fragmentPets.appendChild(clone)


        containerPets.appendChild(fragmentPets)

    } catch (error) {
        console.log(error)
        while (containerPets.firstChild) {
            containerPets.removeChild(containerPets.firstChild);
        }
        const clone = templateError.cloneNode(true)
        fragmentPets.appendChild(clone)
        containerPets.appendChild(fragmentPets)
    }
})