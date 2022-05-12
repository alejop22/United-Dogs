import {FIND_DOG} from '../actions/action-type.js';

const initialState = {
    dog: {},
    dogs: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_DOG:
            return {
                ...state,
                dogs: [...state.dogs, action.payload]
            }
        default:
            return state;
    }
}

export {
    reducer
}