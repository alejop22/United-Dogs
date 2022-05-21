import { FIND_DOG, FIND_ID_DOG, SWITCH_TEMPERAMENT, FIND_TEMPERAMENTS, FIND_ALL_DOGS, DELETE_DOG, FILTER_DOGS, CLEAN_FILTER, FILTER_BREED } from './action-type.js';

// Hace peticion a la API de un perro por el query del nombre
const findDogAPI = (breed) => {
    return function(dispatch) {
        return fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)
            .then(rs => rs.json())
            .then(async (data) => {
                if(data.length === 0) throw `No se encontró la raza ${breed} en la API`;
                dispatch({type: FIND_DOG, payload: data[0]});
            })
            .catch(e => console.log(e));
    }
}

// Hace peticion a la BD de un perro por el query del nombre
const findDogBD = (breed) => {
    breed = breed.charAt(0).toUpperCase() + breed.slice(1);
    return function(dispatch) {
        return fetch(`http://localhost:3001/dogs?name=${breed}`)
            .then(rs => {
                if(!rs.ok) throw rs.statusText+ ' in data base';
                return rs.json();
            })
            .then(data => {
                if(data.error) throw data.error;
                dispatch({type: FIND_DOG, payload: data})
            })
            .catch(e => console.log(e));
    }
}

// Hace peticion a la API  y a la BD de un perro por el param id
const findIdDog = (id) => {
    if (id.length > 3) {
        return function(dispatch) {
            return fetch(`http://localhost:3001/dogs/${id}`)
                .then(rs => {
                    if(!rs.ok) throw rs.statusText+ ' in data base';
                    return rs.json();
                })
                .then(data => {
                    if(data.error) throw data.error;
                    dispatch({type: FIND_ID_DOG, payload:data});
                })
                .catch(e => console.log(e));
        }
    }
    return function(dispatch) {
        return fetch(`https://api.thedogapi.com/v1/breeds/${id}`)
            .then(rs => rs.json())
            .then(data => {
                dispatch({type: FIND_ID_DOG, payload:data});
            })
    }
}

// Hace peticion a la API  y a la BD de un perro por el param id para llenar el array de filtrado
const filterTemp = (id) => {
    if (id.length > 3) {
        return function(dispatch) {
            return fetch(`http://localhost:3001/dogs/${id}`)
                .then(rs => {
                    if(!rs.ok) throw rs.statusText+ ' in data base';
                    return rs.json();
                })
                .then(data => {
                    if(data.error) throw data.error;
                    dispatch({type: FILTER_DOGS, payload:data});
                })
                .catch(e => console.log(e));
        }
    }
    return function(dispatch) {
        return fetch(`https://api.thedogapi.com/v1/breeds/${id}`)
            .then(rs => rs.json())
            .then(data => {
                dispatch({type: FILTER_DOGS, payload:data});
            })
    }
}


// Hace peticion a la API de un perro por el query del nombre para llenar el array de filtrado
const filterBreedAPI = (breed) => {
    return function(dispatch) {
        return fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)
            .then(rs => rs.json())
            .then(async (data) => {
                if(data.length === 0) throw `No se encontró la raza ${breed} en la API`;
                dispatch({type: FILTER_BREED, payload: data[0]});
            })
            .catch(e => console.log(e));
    }
}

// Hace peticion a la BD de un perro por el query del nombre para llenar el array de filtrado
const filterBreedBD = (breed) => {
    breed = breed.charAt(0).toUpperCase() + breed.slice(1);
    return function(dispatch) {
        return fetch(`http://localhost:3001/dogs?name=${breed}`)
            .then(rs => {
                if(!rs.ok) throw rs.statusText+ ' in data base';
                return rs.json();
            })
            .then(data => {
                if(data.error) throw data.error;
                dispatch({type: FILTER_BREED, payload: data})
            })
            .catch(e => console.log(e));
    }
}

// Vacia el array de filtrado
const cleanFilter = () => {
    return {type: CLEAN_FILTER, payload: []}
}

// Consulta en el API y en la BD todos los perros
const findAllDogs = () => {
    return function(dispatch) {
        return fetch('https://api.thedogapi.com/v1/breeds')
            .then(rs => rs.json())
            .then(async dataAPI => {

                const allDogs = dataAPI;

                const rs = await fetch('http://localhost:3001/dogs');
                const dataBD = await rs.json();

                if (dataBD.length > 0) {
                    for (const data of dataBD) {
                        allDogs.push(data);
                    }
                }
                
                dispatch({type: FIND_ALL_DOGS, payload: allDogs});
            });
    }
}

// Elimina uno de los perros por medio de su id
const deleteDog = (id) => {
    return {type: DELETE_DOG, payload: id};
}

// Modifica el estado del switch dependiendo si hay temperamentos o no en la BD
const switchTemperaments = () => {
    return function(dispatch) {
        return fetch('http://localhost:3001/temperament/find')
            .then(rs => {
                if (rs.ok) {
                    dispatch({type: SWITCH_TEMPERAMENT, payload: true});
                } else {
                    dispatch({type: SWITCH_TEMPERAMENT, payload: false});
                }
            });
    }
}

// Crea una nueva raza en la BD
const createBreed = (breed) => {
    breed.name = breed.name.charAt(0).toUpperCase() + breed.name.slice(1);
    return function() {
        return fetch('http://localhost:3001/dog', {
            method: 'POST',
            body: JSON.stringify(breed),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(rs => {
            if (rs.ok) {
                alert('La raza se ha creado correctamente');
            } else {
                alert(`Error al crear la raza ${rs.statusText}`);
            }
        });
    }
}

// Consulta los temperamentos de la BD
const findTemperaments = () => {
    return function(dispatch) {
        return fetch('http://localhost:3001/temperament')
            .then(rs => rs.json())
            .then(data => {
                dispatch({type: FIND_TEMPERAMENTS, payload: data});
            });
    }
}

export {
    findDogAPI,
    findDogBD,
    findIdDog,
    switchTemperaments,
    createBreed,
    findTemperaments,
    findAllDogs,
    deleteDog,
    filterTemp,
    cleanFilter,
    filterBreedAPI,
    filterBreedBD
}
