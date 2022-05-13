import {FIND_DOG, FIND_ID_DOG, SWITCH_TEMPERAMENT, FIND_TEMPERAMENTS} from '../actions/action-type.js';

const initialState = {
    dog: {},
    dogs: [],
    switche: true,
    temperaments: [],
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
        default:
            return state;
    }
}

export {
    reducer
}