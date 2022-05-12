import { FIND_DOG, FIND_ID_DOG } from './action-type.js';


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

const findIdDogBD = (id) => {
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

export {
    findDogAPI,
    findDogBD,
    findIdDogBD,
}
