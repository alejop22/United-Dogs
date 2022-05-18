import { FIND_DOG, FIND_ID_DOG, SWITCH_TEMPERAMENT, FIND_TEMPERAMENTS, FIND_ALL_DOGS, DELETE_DOG } from './action-type.js';


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

const findDogBD = (breed) => {
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
                        data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                        allDogs.push(data);
                    }
                }
                
                dispatch({type: FIND_ALL_DOGS, payload: allDogs});

            });
    }
}

const deleteDog = (id) => {
    return {type: DELETE_DOG, payload: id};
}

const insertTemperament = () => {
    return function(dispatch) {
        return fetch('https://api.thedogapi.com/v1/breeds')
            .then(rs => rs.json())
            .then(async (data) => {
                if(data.length === 0) {
                    throw 'Error consumo API'
                }
                const arrAux = [];
                for (const iterator of data) {
                    
                    if (iterator.temperament) {

                        const temperamentos = iterator.temperament.replace(/,/g, '');
                        const arrTemperamentos = temperamentos.split(' ');
                        for (const i of arrTemperamentos) {
                            arrAux.push(i);
                        }
                    }
                }
                const soloTemperamentos = [...new Set(arrAux)]; // Guardo todos los temperamentos sin repetirlos
                for (const iterator of soloTemperamentos) {
                    try {
                        const objTemperamento = {name: iterator}
                        
                        const rsDB = await fetch('http://localhost:3001/temperament', {
                            method: 'POST',
                            body: JSON.stringify(objTemperamento),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if (!rsDB.ok) {
                            throw 'Error al guardar temperamento en la base de datos';
                        }
                        
                    } catch (error) {
                        console.log(error);
                    }
                }
            })
            .catch(e => console.log(e));
    }
}


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

const createBreed = (breed) => {
    return function(dispatch) {
        return fetch('http://localhost:3001/dog', {
            method: 'POST',
            body: JSON.stringify(breed),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(rs => console.log(rs));
    }
}

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
    insertTemperament,
    switchTemperaments,
    createBreed,
    findTemperaments,
    findAllDogs,
    deleteDog
}
