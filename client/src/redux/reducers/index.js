import {FIND_DOG, FIND_ID_DOG, SWITCH_TEMPERAMENT, FIND_TEMPERAMENTS, FIND_ALL_DOGS, DELETE_DOG, FILTER_DOGS, CLEAN_FILTER, FILTER_BREED} from '../actions/action-type.js';

const initialState = {
    dog: {},
    dogs: [],
    switche: true,
    temperaments: [],
    allDogs: [],
    filterDogs: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_DOG:
            return {
                ...state,
                dogs: [...state.dogs, action.payload]
            }
        case FIND_ID_DOG:
            return {
                ...state,
                dog: action.payload
            }
        case SWITCH_TEMPERAMENT:
            return {
                ...state,
                switche: action.payload
            }
        case FIND_TEMPERAMENTS:
            return {
                ...state,
                temperaments:  action.payload
            }
        case FIND_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload
            }
        case DELETE_DOG:
            return {
                ...state,
                dogs: [...state.dogs.filter(dog => dog.id !== action.payload)]
            }
        case FILTER_DOGS:
            return {
                ...state,
                filterDogs: [...state.filterDogs, action.payload],
                allDogs: [...state.filterDogs, action.payload]
            }
        case FILTER_BREED:
            return {
                ...state,
                filterDogs: [...state.filterDogs, action.payload],
                allDogs: [...state.filterDogs, action.payload]
            }
        case CLEAN_FILTER:
            return {
                ...state,
                filterDogs: action.payload
            }
        default:
            return state;
    }
}

export {
    reducer
}